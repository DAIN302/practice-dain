import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../assets/Loading.tsx";
import { LessThan } from "../../assets/LessThan.tsx";
import { GreaterThan } from "../../assets/GreaterThan.tsx";
import { ArrowLeft } from "../../assets/ArrowLeft.tsx";
import { Balance } from "../../assets/Balance.tsx";
import { Vector } from "../../assets/Vector.tsx";
import Type from "../../components/Type";
import BaseStat from "../../components/BaseStat.tsx";
// import DamageRelation from "../../components/DamageRelation";
import DamageModal from "../../components/DamageModal.tsx";
import { FormattedPokemonData } from "../../types/FormattedPokemonData";
import { Ability, PokemonDetail, Sprites, Stat } from "../../types/PokemonDetail";
import { DamageRelationOfPokemonType } from "../../types/DamageRelationOfPokemonTypes";
import {
  FlavorTextEntry,
  PokemonDescription,
} from "../../types/PokemonDescription";
import { PokemonData } from "../../types/PokemonData";

interface NextAndPreviousPokemon {
  next: string | undefined;
  previous: string | undefined;
}

const DetailPage = () => {
  const [pokemon, setPokemon] = useState<FormattedPokemonData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const params = useParams() as { id: string };
  const pokemonId = params.id;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  // 개별 포켓몬 데이터 가져오기
  const fetchPokemonData = async (id: string) => {
    const url = `${baseUrl}${id}`;
    try {
      const { data: pokemonData } = await axios.get<PokemonDetail>(url);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities, sprites } =
          pokemonData;

        // 이전 포켓몬, 다음 포켓몬 이름 가져오기
        const nextAndPrviousPokemon: NextAndPreviousPokemon =
          await getNextAndPreviousPokemon(id);

        // 데미지 관계 -> 타입을 이용해서 타입의 상세 정보 가져오고 그거에 따른 데미지 관계 데이터 바인딩
        // 데이터 처리 후 리턴을 위해 Promise.all 사용
        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get<DamageRelationOfPokemonType>(
              i.type.url
            );
            return type.data.damage_relations;
          })
        );

        const formattedPokemonData: FormattedPokemonData = {
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
          sprites: formatPokeSprites(sprites),
          description: await getPokemonDescription(id),
        };

        setPokemon(formattedPokemonData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // 한글로 된 데이터 가져오기
  const filterAndFormatDescription = (
    flavorText: FlavorTextEntry[]
  ): string[] => {
    const koreanDescriptions = flavorText
      ?.filter((text) => text.language.name === "ko")
      .map((text) => text.flavor_text.replace(/\r|\n|\f/g, " "));

    return koreanDescriptions;
  };

  // 포켓몬 설명 데이터
  const getPokemonDescription = async (id: number): Promise<string> => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const { data: pokemonSpecies } = await axios.get<PokemonDescription>(url);

    const desc: string[] = filterAndFormatDescription(
      pokemonSpecies.flavor_text_entries
    );

    return desc[Math.floor(Math.random() * desc.length)];
  };

  // sprites 데이터 가공
  const formatPokeSprites = (sprites: Sprites) => {
    // 원본을 변경하지 않기 위해 새로 만들어서 할당
    const newSprites = { ...sprites };

    // Object.keys -> 키들만 배열에 담아줌
    // keyof -> key 값만 가져오고 싶을 떄 사용
    // keyof typeof newSprites -> newSprites 타입으로 바꿔주고, 키 값을 가져옴
    (Object.keys(newSprites) as (keyof typeof newSprites)[]).forEach((key) => {
      if (typeof newSprites[key] !== "string") {
        delete newSprites[key]; // value type이 string 이 아닌 것들은 지우기
      }
    });

    // 배열안에 있는 string 들이 리턴되는 것
    return Object.values(newSprites) as string[]; // 값만 리턴
  };

  // stats 데이터 가공
  const formatPokemonStats = ([
    statHP,
    StatATK,
    statDEP,
    statSATK,
    statSDEF,
    statSPD,
  ]: Stat[]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: StatATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEF.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  // abilities 데이터 가공 (2개만 나오게)
  const formatPokemonAbilities = (abilities: Ability[]) => {
    return abilities
      .filter((_, idx) => idx <= 1)
      .map((obj: Ability) => obj.ability.name.replaceAll("-", " "));
  };

  // 이전 포켓몬, 다음 포켓몬 이름 가져오는 함수
  const getNextAndPreviousPokemon = async (id: number) => {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const nextResponse =
      pokemonData.next && (await axios.get<PokemonData>(pokemonData.next));
    const previousResponse =
      pokemonData.previous && (await axios.get<PokemonData>(pokemonData.previous));

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
        {pokemon?.previous && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 left-1"
            to={`/pokemon/${pokemon.previous}`}
          >
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {pokemon?.next && (
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
                {pokemon?.name}
              </h1>
            </div>
            <div className="text-zinc-200 font-bold text-md">
              {pokemon?.id.toString().padStart(3, "00")}
            </div>
          </div>
          <div className="relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemon?.name}
              className="object-contain h-full"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>
        {/* 밑 부분 */}
        <section className="w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4">
          <div className="flex items-center justify-center gap-4">
            {/* 포켓몬 타입 */}
            {pokemon?.types.map((type) => (
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
                {pokemon?.weight}kg
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Height</h4>
              <div className="text-sm text-zinc-200 flex mt-1 gap-2 justify-center">
                <Vector />
                {pokemon?.height}m
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Abilities</h4>
              <div className="text-sm text-zinc-200 flex mt-1 gap-2 justify-center">
                {pokemon?.abilities.map((ability) => (
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
                {pokemon?.stats.map((stat) => (
                  <BaseStat
                    key={stat.name}
                    valueStat={stat.baseStat}
                    nameStat={stat.name}
                    type={pokemon.types[0]}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* 포켓몬 설명 */}
          <h2 className={`text-base font-semibold ${text}`}>설명</h2>
          <p className="text0md leading-4 font-sans text-zinc-200 max-w-[30rem] text-center">
            {pokemon?.description}
          </p>
          {/* 스프라이츠 이미지 */}
          <div className="flex my-8 flex-wrap justify-center">
            {pokemon?.sprites.map((url, idx) => (
              <img src={url} key={idx} alt="sprites" />
            ))}
          </div>
        </section>
      </div>
      {/* 데미지관계 모달 */}
      {isModalOpen && (
        <DamageModal
          setIsModalOpen={setIsModalOpen}
          damages={pokemon?.DamageRelations}
        />
      )}
    </article>
  );
};

export default DetailPage;
