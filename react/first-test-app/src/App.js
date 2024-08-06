import React, {useState} from 'react';
import './App.css';
import { VillagerInfo, Villagers } from './components/Villagers';

function App() {
  const villager= [
    {name : '릴리안', birthday : '5월 9일생'},
    {name : '쭈니', birthday : '9월 29일생'},
    {name : '아네사', birthday : '6월 23일생'},
    {name : '리키', birthday : '6월 3일생'},
    {name : '마티', birthday : '4월 16일생'},
    {name : '스파크', birthday : '7월 9일생'},
    {name : '레베카', birthday : '9월 10일생'},
    {name : '미애', birthday : '3월 10일생'},
    {name : '스피카', birthday : '9월 11일생'},
    {name : '미첼', birthday : '5월 19일생'},
]

const [name, setName] = useState('릴리안')
const [day, setDay] = useState('5월 9일생')

const clickVillger = (e) => {
  let vName = e.currentTarget.innerText
  let vDay = e.currentTarget.lastChild.getAttribute('data-day')
  setName(vName)
  setDay(vDay)
}

  return (
    <div className="App">
      <Villagers villager={villager} click={clickVillger}/>
      <VillagerInfo name={name} day={day}/>
    </div>
  );
}

export default App;
