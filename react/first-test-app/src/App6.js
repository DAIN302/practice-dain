import React from 'react';
import { VillagerInfo, Villagers } from './components/VillagersRedux';
import './styles/Villagers.scss'


function App6() {
  return (
    <div className="App">
      <Villagers />
      <VillagerInfo />
    </div>
  );
}

export default App6;
