import React from 'react'

export default function DarkmodeToggle({chgTheme}) {
  return (
    <>
        <input type='checkbox' id='darkmode-toggle' onChange={(e) => chgTheme(e.target.checked ? 'dark' : 'light')}/>
        <label htmlFor='darkmode-toggle' className='darkmode-toggle'></label>
    </>
  )
}
