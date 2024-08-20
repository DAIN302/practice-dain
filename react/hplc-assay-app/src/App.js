import './App.css';
import React, {useMemo, useState} from 'react';
import StandardPeak from './components/StandardPeak';
import StandardResult from './components/StandardResult';

function App() {

  return (
    <div className="App">
      <StandardPeak/>
      <StandardResult/>
    </div>
  );
}

export default App;
