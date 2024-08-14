import React, {useReducer, useRef} from 'react'

const initPeak = [0,0,0,0,0,0]

const reducer = (state, action) => {
  let peakIndex = (action.inputIdNum) - 1
  let peakValue = Number(action.inputValue)

  switch(peakIndex) {
    case 0 : return state[0] = peakValue;
    case 1 : return state[1] = peakValue;
    case 2 : return state[2] = peakValue;
    case 3 : return state[3] = peakValue;
    case 4 : return state[4] = peakValue;
    case 5 : return state[5] = peakValue;
    default :  return state[peakIndex] = 0;
  }
}

export default function StandardPeak() {
    const [peak, dispatch] = useReducer(reducer, initPeak)

    const inputRef = useRef([])

    const inputArr = [1,2,3,4,5,6]

    const stdArr = (e) => {
      let inputId = e.currentTarget.getAttribute('id');
      let inputValue = e.currentTarget.value;
      let inputIdNum = [...inputId].filter(num=>!isNaN(num)).join()
      inputIdNum = Number(inputIdNum)
      dispatch({inputIdNum, inputValue})
    }
  return (
    <div>
      {
        inputArr.map((number) => 
          <input key={number} type='number' id={'std'+(number)} onBlur={stdArr} ref={el => inputRef.current[number - 1] = el} />
        )
      }
    </div>
  )
}
