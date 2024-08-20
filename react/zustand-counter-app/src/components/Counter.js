import React from 'react'
import { useCounterStore } from '../store'

export const Counter = () => {
  const {count, increament, decreament, reset, setNumber} = useCounterStore()
  return (
    <div>
      <p>{count}</p>
      <button onClick={increament}>one up</button>
      <button onClick={decreament}>one down</button>
      <button onClick={reset}>reset</button>
      <button onClick={()=>setNumber(3)}>3</button>
    </div>
  )
}
