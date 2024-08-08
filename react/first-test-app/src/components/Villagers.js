import React from 'react'

export const Villagers = ({villager, click}) => {
  return (
    <ul className='villager-list'>
        {
            villager.map((v,i)=>
                <li key={i} onClick={click}>
                    <figure>
                        <img src={'./image/acnh/'+v.name+'1.png'} alt={v.name}/>
                    </figure>
                    <p data-day={v.birthday}>{v.name}</p>
                </li>
            )
        }
    </ul>
  )
}

export const VillagerInfo = ({name, day}) => {
    return(
        <div className='info'>
            <h2>{name}</h2>
            <figure>
                <img src={'./image/acnh/'+name+'2.png'} alt={name}/>
            </figure>
            <p>{day}</p>
        </div>
    )
}
