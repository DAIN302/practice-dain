import React, { useReducer } from 'react';
import './styles/Villagers.scss'
import villagers from './data/villagersData'
import { villagersType } from './types/types';
import { Villagers, VillagerInfo } from "./components/Villagers";

const initState : villagersType = villagers[0]

const reducer = (prevState : villagersType, action : number) => {
  return prevState = villagers[action - 1]
}

function App() {
  const [villager, dispatch] = useReducer(reducer, initState)  

  const clickVillger = (e:React.MouseEvent<HTMLElement>) => {
    let vId : number = Number(e.currentTarget.getAttribute('data-list'))
    
    dispatch(vId)
  }
  return (
    <div className="App">
      <Villagers villager={villagers} click={clickVillger}/>
      <VillagerInfo name={villager.name} day={villager.birthday}/>
    </div>
  );
}

export default App;
