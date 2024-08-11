import React, {useReducer, useState} from 'react';
import './App.css';
import { VillagerInfo, Villagers } from './components/Villagers';

const villagers= [
  {id : '1', name : '릴리안', birthday : '5월 9일생'},
  {id : '2', name : '쭈니', birthday : '9월 29일생'},
  {id : '3', name : '아네사', birthday : '6월 23일생'},
  {id : '4', name : '리키', birthday : '6월 3일생'},
  {id : '5', name : '마티', birthday : '4월 16일생'},
  {id : '6', name : '스파크', birthday : '7월 9일생'},
  {id : '7', name : '레베카', birthday : '9월 10일생'},
  {id : '8', name : '미애', birthday : '3월 10일생'},
  {id : '9', name : '스피카', birthday : '9월 11일생'},
  {id : '10', name : '미첼', birthday : '5월 19일생'},
]

const initState = villagers[0]

const reducer = (prevState, action) => {
  return prevState = villagers[action - 1]
}

function App5() {
  const [villager, dispatch] = useReducer(reducer, initState)  

  const clickVillger = (e) => {
    let vId = e.currentTarget.getAttribute('data-list')
    
    dispatch(vId)
  }

  return (
    <div className="App">
      <Villagers villager={villagers} click={clickVillger}/>
      <VillagerInfo name={villager.name} day={villager.birthday}/>
    </div>
  );
}

export default App5;
