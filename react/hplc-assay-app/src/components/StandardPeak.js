import React, {useReducer, useRef} from 'react'

const initPeak = []

const reducer = (state, action) => {
  
}

export default function StandardPeak() {
    const [peak, dispatch] = useReducer(reducer, initPeak)

    const inputRef = useRef([])

    const inputArr = [1,2,3,4,5,6]

    const stdArr = (e) => {
      let inputId = e.currentTarget.getAttribute('id')
      dispatch(inputId)
    }
  return (
    <div>
      {
        inputArr.map((number, index) => 
          <input key={index} type='number' id={'std'+(index+1)} onBlur={stdArr} ref={el => inputRef.current[index] = el} />
        )
      }
    </div>
  )
}
