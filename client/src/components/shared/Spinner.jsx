import React from 'react'

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-rgba(0, 0, 0, 0.5)'>
 <div className=' w-48 h-48 border-5 border-green-400 rounded-full  items-center justify-center inline-block animate-bounce'>
  Loading...
</div>

</div>

  )
}

export default Spinner
