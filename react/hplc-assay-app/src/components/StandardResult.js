import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function StandardResult() {
  const { stdAvg, stdSD, stdRSD } = useSelector(state => state.stdValue)
  console.log(stdAvg, stdSD, stdRSD);
  

  return (
    <div>
        <input type='number' id='stdAvg' placeholder='평균' readOnly value={stdAvg > 0? stdAvg : ''}/>
        <input type='number' id='stdSD' placeholder='표준편차' readOnly value={stdSD > 0? stdSD : ''}/>
        <input type='number' id='stdRSD' placeholder='RSD' readOnly value={stdRSD > 0?  stdRSD : ''}/>
    </div>
  )
}
