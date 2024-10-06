import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LazyImage } from './LazyImage';
import { PokemonNameAndUrl } from '../types/PokemonData';
import { PokemonDetail } from '../types/PokemonDetail';

interface PokeData {
  id : number;
  types : string;
  name : string;
}

const PokeCard = ({url, name} : PokemonNameAndUrl) => {
  const [pokemon, setPokemon] = useState<PokeData>(); 
  useEffect(()=>{
    fetchPokeDetailData();
  }, [])

  async function fetchPokeDetailData(){
    try {
        const response = await axios.get(url);
        const pokemonData = formatPokemonData(response.data)
        setPokemon(pokemonData);
    } catch (error) {
        console.error(error)
    }
  }

  function formatPokemonData(params : PokemonDetail){
    // 필요한 데이터만 구조분해 할당
    const {id, types, name} = params;
    const PokeData: PokeData= {
        id, 
        name, 
        types: types[0].type.name
    }
    return PokeData;
  }

  // 포켓몬이 있으면 타입을 가져오기
  const bg = `bg-${pokemon?.types}`;
  const border = `border-${pokemon?.types}`;
  const text = `text-${pokemon?.types}`;

  //console.log(pokemon.types)
  // 포켓몬 이미지 url
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`

  return (
    <>
    { pokemon && 
      <Link to={`/pokemon/${name}`} 
      className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}>
        <div className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}>
          #{pokemon.id.toString().padStart(3, '00')}
        </div>
        <div className={`w-full f-6 flex items-center justify-center`}>
          <div className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}>
            <LazyImage url={img} alt={name}/>
            {/* <img src={img} alt={name} width='100%' className='object-contain h-full'/> */}
          </div>
        </div>
        <div className={`${bg} text-center text-xs text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium pt-1`}>
          {pokemon.name}
        </div>
      </Link>  
    }
    </>

  )
}

export default PokeCard