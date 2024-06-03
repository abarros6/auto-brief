import React, { useState } from 'react'
import PDF from './components/PDF'
function App() {

  return (
    <div className='flex flex-col text-center p-8'>
      <h1 className='text-3xl text-bold'>Auto-Brief</h1>
      <div className='flex flex-row items-center justify-evenly'>
        <PDF/>

      </div>
    </div>
  )
}

export default App
