import React from 'react';
import Viewer from './components/Viewer';

const App = () => {

  return (
    <div className='flex flex-col justify-center text-center min-h-screen p-8'>
      <h1 className='p-8 text-4xl'>Auto-Brief</h1>
      <Viewer/>
    </div>
  )
}

export default App
