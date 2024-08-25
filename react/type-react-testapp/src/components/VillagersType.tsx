import React from 'react'
import villagers from '../data/villagersData'
import { useDispatch, useSelector } from 'react-redux'
import { chgIndex } from '../store/villagersSlice'


export const Villagers = () => {
    const dispatch = useDispatch()

    const villagerClick = (e) => {
        let vId = e.currentTarget.getAttribute('data-list') - 1
        dispatch(chgIndex(vId))
    }

  return (
    <ul className='villager-list'>
        {
            villagers.map((v,i)=>
                <li key={i} onClick={villagerClick} data-list={v.id} className={`villager villager${v.id}`}>
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

export const VillagerInfo = () => {
    const villager =  useSelector(state => state.villager.info)
    const {name, birthday} = villager
    
    return(
        <div className='villager-info'>
            <h2 className='villager-name'>{name}</h2>
            <figure className='villager-img'>
                <img src={'./image/acnh/'+name+'2.png'} alt={name}/>
            </figure>
            <p className='villager-birthday' >{birthday}</p>
        </div>
    )
}
