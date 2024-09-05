import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import PokeCard from './components/PokeCard'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [pokemons, setPokemons] = useState([]);
  // 더보기 기능
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  // 검색 기능
  const [seachTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(seachTerm, 500)

  // useEffect 이용해서 요청보내기
  useEffect(()=>{
    fetchPokeData(true);
  }, [])

  useEffect(() => {
    handleSearchInput(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  

  // 포켓몬 데이터 가져오는 함수
  const fetchPokeData = async (isFirstFetch) => {
    // 비동기 요청
    try {
      const offsetValue = isFirstFetch ? 0 : offset + limit

      // 포켓몬 api 주소
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`
      // 20번까지의 포켓몬만 출력, 페이지네이션을 위해 offset설정

      const response = await axios.get(url)
      // setPokemons(response.data.results)
      setPokemons([...pokemons, ...response.data.results])
      // 더보기 누를때마다 limit 갯수 만큼 가져옴
      setOffset(offsetValue)
    } catch(error){
      console.error(error)
    }
  }

  // 검색 기능
  const handleSearchInput = async (seachTerm) => {
    // setSearchTerm(e.target.value);
    if(seachTerm.length > 0) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${seachTerm}`)
        const pokemonData = {
          url : `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name : seachTerm
        }
        setPokemons([pokemonData])
      } catch (error) {
        setPokemons([]);
        console.error(error);
      }
    } else {
      fetchPokeData(true)
    }
  }

  return (
    <>
      <article className='pt-6'>
        <header className='flex flex-col gap-2 w-full px-4 z-50'>
          <div className='relative z-50'>
            {/* 검색창 */}
            <form className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto'>
              <input type='text' 
              value={seachTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='text-xs w-[20.5rem] h-6 px-2 py-1 rounded-lg bg-[hsl(214,13%,47%)] text-gray-300 text-center'/>
              <button type='submit' className='text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'>검색</button>
            </form>
          </div>
        </header>
        <section className='pt-6 flex flex-col justify-center items-center overflow-auto z-0'>
          <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
            {pokemons.length > 0 ? 
              (
                pokemons.map(({url, name}, index)=> (
                  <PokeCard url={url} name={name} key={url}/>
                ))
              ) : 
              (
                <h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
              )
            }
          </div>
        </section>
        {/* 더보기 기능 */}
        <div className='text-center'>
          <button onClick={()=>fetchPokeData(false)}
          className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>더보기</button>
        </div>
      </article>
    </>
  )
}


