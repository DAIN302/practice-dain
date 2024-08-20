import './App.css';
import React, {useMemo, useState} from 'react';
import StandardPeak from './components/StandardPeak';
import StandardResult from './components/StandardResult';

function App() {
  const [stdPeak, setStdPeak] = useState([]); // 스탠다드 피크
  const [stdPeakResult, setStdPeakResult] = useState([]) // 첫번째 - 평균, 두번째 - 표준편차, 세번째 - RSD 

  const stdResult = useMemo(() => {
    getStdResult()   
  }, [stdPeak])

  // 자식에게 전달
  const addPeak = (newPeak) => {
    setStdPeak([newPeak])
  }

  // 결과값 얻는 함수
  function getStdResult(){
    let stdAvg = stdPeak.reduce((acc,cur, i, {length}) => i === length - 1?(acc+Number(cur)) / length : acc + Number(cur), 0)
    console.log('평균',stdAvg);
  }

  console.log('부모', stdPeak[0]);
  

  return (
    <div className="App">
      <StandardPeak addPeak={addPeak}/>
      <StandardResult result={stdPeakResult}/>
    </div>
  );
}

export default App;
