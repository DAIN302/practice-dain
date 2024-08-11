import './App.css';
import React, {useState} from 'react';
import StandardPeak from './components/StandardPeak';
import StandardResult from './components/StandardResult';

function App() {
  const [stdPeak, setStdPeak] = useState([])
  

  return (
    <div className="App">
      <StandardPeak />
      <StandardResult />
    </div>
  );
}

export default App;
