import React from 'react'

export default function StandardResult(props) {
  return (
    <div>
        <input type='number' id='stdAvg' placeholder='평균' readOnly/>
        <input type='number' id='stdSD' placeholder='표준편차' readOnly/>
        <input type='number' id='stdRSD' placeholder='RSD' readOnly/>
    </div>
  )
}
