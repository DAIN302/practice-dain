import React from 'react'
import { villagersType } from '../types/types'

interface villagerProps {
    villager : villagersType[];
    click(e : React.MouseEvent<HTMLElement>) : void;
}

interface infoProps {
    name : string;
    day : string;
}

export const Villagers = ({villager, click} : villagerProps) => {
  return (
    <ul className='villager-list'>
        {
            villager.map((v,i)=>
                <li key={i} onClick={click} data-list={v.id} className={`villager villager${v.id}`}>
                    <figure className='villager-img'>
                        <img src={'./image/acnh/'+v.name+'1.png'} alt={v.name}/>
                    </figure>
                    <p className='villager-name' data-day={v.birthday}>{v.name}</p>
                </li>
            )
        }
    </ul>
  )
}

export const VillagerInfo = ({name, day} : infoProps) => {
    return(
        <div className='villager-info'>
            <h2 className='villager-name'>{name}</h2>
            <figure className='villager-img'>
                <img src={'./image/acnh/'+name+'2.png'} alt={name}/>
            </figure>
            <p className='villager-birthday' >{day}</p>
        </div>
    )
}
