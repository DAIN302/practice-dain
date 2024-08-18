import React, {useRef, useState} from 'react'

export default function StandardPeak({addPeak}) {
    const [stdPeak, setStdPeak] =  useState([0,0,0,0,0,0])

    const inputRef = useRef([])

    const inputArr = [1,2,3,4,5,6]

    const addPeakRes = (e, idx) => {
      const res = Number(e.target.value);
      const peakarr = stdPeak.map((v,i)=>{
        if(i === idx) return res;
        else return v;
      })

      setStdPeak(peakarr) 
      // 부모에게 전달
      addPeak(peakarr)
    }

    console.log('자식',stdPeak);
    

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
