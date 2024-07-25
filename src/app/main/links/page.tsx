import React from 'react'
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <div className='flex w-full p-10'>
      <div className='w-[40%] flex justify-center'>
        <img src="/images/phone.svg" alt="phone mockup" className='h-[70%]'/>
      </div>
      <div className='w-[60%]'>
        <h1 className='text-[#333333] font-bold text-3xl'>Customize your links</h1>
        <p className='text-[#737373] mt-1'>Add/edit/remove links below and then share all your profiles with the world!</p>
        <button className='flex justify-center items-center mt-3 w-[90%] border-2 border-main p-2 rounded-lg text-main font-semibold gap-1'><FaPlus /><p>Add new link</p></button>
        <div className='flex flex-col justify-center items-center mt-5 p-5'>
          <img src="/images/middle.svg" alt="illustration" />
          <h1 className='text-[#333333] font-bold text-3xl'>Let's get you started</h1>
          <p className='w-[80%] text-center mt-5 text-[#737373]'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
        </div>
      </div>
    </div>
  )
}

export default page