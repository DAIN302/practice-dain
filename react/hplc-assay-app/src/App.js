import './App.css';
import React, {useMemo, useState} from 'react';
import StandardPeak from './components/StandardPeak';
import StandardResult from './components/StandardResult';

function App() {
  const [stdPeak, setStdPeak] = useState([]) // 첫번째 - 평균, 두번째 - 표준편차, 세번째 - RSD 

  const stdResult = useMemo(() => {
    getStdResult()
    
  }, [stdPeak])

  const getStdResult = () => {
      // let stdAvg = reduce((acc,cur, i, {length}) => i === length - 1?(acc+cur) / length : acc + cur, 0)
      // let stdSD = 
      // let stdRSD = 
  }

  return (
    <div className="App">
      <StandardPeak />
      <StandardResult result={stdPeak}/>
    </div>
  );
}

export default App;
