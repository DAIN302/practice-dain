import React, {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { peakArr, stdAvg, stdSD, stdRSD } from '../store/stdValueSlice';

export default function StandardPeak() {
    const inputRef = useRef([])
    const stdArr = useSelector(state => state.stdValue.stdArr)
    const dispatch = useDispatch();

    const inputArr = [1,2,3,4,5,6]

    const addPeakRes = (e, idx) => {
      const res = Number(e.target.value);
      const peak = stdArr.map((v,i) => {
        if(i === idx) return res;
        else return v;
      })
      
      dispatch(peakArr(peak))
      dispatch(stdAvg())   
      dispatch(stdSD())   
      dispatch(stdRSD())   
    }

  return (
    <div>
      {
        inputArr.map((number) => 
          <input key={number} type='number' id={'std'+(number)} 
        ref={el => inputRef.current[number - 1] = el} onBlur={(e)=>addPeakRes(e, number-1)}/>
        )
      }
    </div>
  )
}
