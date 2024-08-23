import React from 'react'

export default function SamplePeak() {
  const inputArr = [1,2,3]
  return (
    <div>
      {
        inputArr.map(num => 
          <input key={num} type='number' id={'smp'+(num)} />
        )
      }
    </div>
  )
}
