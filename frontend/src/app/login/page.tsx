import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow w-80'>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          <input className='border p-2 w-full mb-3' placeholder="Username" />
          <input className='border p-2 w-full mb-3' placeholder="Password" type="password" />
          <button className='bg-blue-500 text-white p-2 w-full rounded-lg'>Login</button>
      </div>
    </div>
  )
}

export default page