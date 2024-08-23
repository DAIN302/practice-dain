import React from 'react'

// 입력되어야할 값 : 표준품 취한 량(mg), 검체 취한량(mg), 표준품 순도(%)
export default function Weight() {
  return (
    <div>
        <input type='number' id='std-amount' placeholder='표준품 취한량(mg)'/>
        <input type='number' id='std-purity' placeholder='표준품 순도(%)'/>
        <input type='number' id='smp-amount' placeholder='검체 취한량(mg)'/>
    </div>
  )
}
