import React, {useReducer, useRef} from 'react'

const initPeak = []

const reducer = (state, action) => {
  console.log(action);
  
  // return state[action - 1] = inputRef.current[action-1].value()
}

export default function StandardPeak() {
    const [peak, dispatch] = useReducer(reducer, initPeak)

    const inputRef = useRef([])

    const inputArr = [1,2,3,4,5,6]

    const stdArr = (e) => {
      let inputId = e.currentTarget.getAttribute('id')
      dispatch(inputId)
      console.log(peak);
      
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
