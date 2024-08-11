import React, {useReducer} from 'react'

const initPeak = []

const reducer = (state, action) => {

}

export default function StandardPeak() {
    const [peak, dispatch] = useReducer(reducer, initPeak)
  return (
    <div>
        <input type='number' id='std1' />
        <input type='number' id='std2' />
        <input type='number' id='std3' />
        <input type='number' id='std4' />
        <input type='number' id='std5' />
        <input type='number' id='std6' />
    </div>
  )
}
