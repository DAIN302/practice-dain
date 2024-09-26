import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../assets/Loading";
import { LessThan } from "../../assets/LessThan";
import { GreaterThan } from "../../assets/GreaterThan";
import { ArrowLeft } from "../../assets/ArrowLeft";
import { Balance } from "../../assets/Balance";
import { Vector } from "../../assets/Vector";
import Type from "../../components/Type";
import BaseStat from "../../components/BaseStat";

const DetailPage = () => {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

  useEffect(() => {
    fetchPokemonData();
  }, []);

  // 개별 포켓몬 데이터 가져오기
  const fetchPokemonData = async () => {
    const url = `${baseUrl}${pokemonId}`;
    try {
      const { data: pokemonData } = await axios.get(url);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } =
          pokemonData;

        // 이전 포켓몬, 다음 포켓몬 이름 가져오기
        const nextAndPrviousPokemon = await getNextAndPreviousPokemon(id);

        // 데미지 관계 -> 타입을 이용해서 타입의 상세 정보 가져오고 그거에 따른 데미지 관계 데이터 바인딩
        // 데이터 처리 후 리턴을 위해 Promise.all 사용
        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );

        const formattedPokemonData = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPrviousPokemon.previous,
          next: nextAndPrviousPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations,
          types: types.map((type) => type.type.name),
        };

        setPokemon(formattedPokemonData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // stats 데이터 가공
  const formatPokemonStats = ([
    statHP,
    StatATK,
    statDEP,
    statSATK,
    statSDEF,
    statSPD,
  ]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: StatATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEF.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  // abilities 데이터 가공 (2개만 나오게)
  const formatPokemonAbilities = (abilities) => {
    return abilities
      .filter((_, idx) => idx <= 1)
      .map((obj) => obj.ability.name.replaceAll("-", " "));
  };

  // 이전 포켓몬, 다음 포켓몬 이름 가져오는 함수
  const getNextAndPreviousPokemon = async (id) => {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));
    const previousResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));

    return {
      next: nextResponse?.data?.results?.[0]?.name,
      previous: previousResponse?.data?.results?.[0]?.name,
    };
  };

  // 로딩중
  if (isLoading) {
    return (
      <div className="absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50">
        <Loading className="w-12 h-12 z-50 animate-spin text-slate-900" />
      </div>
    );
  }

  // 포켓몬 데이터를 찾지 못했을 때
  if (!isLoading && !pokemon) {
    return <div>... NOT FOUND</div>;
  }

  // 포켓몬 이미지 url
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;

  return (
    <article className="flex items-center gap-1 flex-col w-full">
      <div
        className={`${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`}
      >
        {/* 화살표 부분 */}
        {pokemon.previous && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 left-1"
            to={`/pokemon/${pokemon.previous}`}
          >
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {pokemon.next && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 right-1"
            to={`/pokemon/${pokemon.next}`}
          >
            <GreaterThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {/* 윗 부분  */}
        <section className="w-full flex flex-col z-20 items-center justify-end relative h-full">
          <div className="absolute z-30 top-6 flex items-center w-full justify-between">
            <div className="flex items-center gap-1">
              <Link to="/">
                <ArrowLeft className="w-6 h-8 text-zinc-200" />
              </Link>
              <h1 className="text-zinc-200 font-bold text-xl capitalize">
                {pokemon.name}
              </h1>
            </div>
            <div className="text-zinc-200 font-bold text-md">
              #{pokemon.id.toString().padStart(3, "00")}
            </div>
          </div>
          <div className="relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemon.name}
              className="object-contain h-full"
            />
          </div>
        </section>
        {/* 밑 부분 */}
        <section className="w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4">
          <div className="flex items-center justify-center gap-4">
            {/* 포켓몬 타입 */}
            {pokemon.types.map((type) => (
              <Type key={type} type={type} />
            ))}
          </div>
          <h2 className={`text-base font-semibold ${text}`}>정보</h2>
          {/* weight, height, abilities */}
          <div className="flex w-full items-center justify-between max-w-[400px] text-center">
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
              <div className="text-sm text-zinc-200 flex mt-1 gap-2 justify-center">
                <Balance />
                {pokemon.weight}kg
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Height</h4>
              <div className="text-sm text-zinc-200 flex mt-1 gap-2 justify-center">
                <Vector />
                {pokemon.height}m
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Abilities</h4>
              <div className="text-sm text-zinc-200 flex mt-1 gap-2 justify-center">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability}
                    className="text-[0.5rem] text-zinc-100 capitalize"
                  >
                    {ability}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className={`text-base font-semibold ${text}`}>기본 능력치</h2>
          <div className="w-full">
            {/* 능력치 */}
            <table>
              <tbody>
                {pokemon.stats.map((stat) => (
                  <BaseStat
                    key={stat.name}
                    valueStat={stat.baseStat}
                    nameStat={stat.name}
                    type={pokemon.types}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* 데미지 관계 - 나중에 모달로 옮길 것 */}
          {pokemon.DamageRelations && (
            <div className="w-10/20">
              <h2 className={`text-base text-center font-semibold ${text}`}>
                데미지 관계
              </h2>
              데미지
            </div>
          )}
        </section>
      </div>
    </article>
  );
};

export default DetailPage;
