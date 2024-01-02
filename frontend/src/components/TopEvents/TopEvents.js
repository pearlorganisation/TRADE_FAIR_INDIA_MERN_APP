import React from 'react'

const TopEvents = () => {
  return (
    <div className='min-h-dvh container mx-auto bg-transparent space-y-12'>
                <div className='text-center text-[#00373E] font-medium text-4xl'>Top List of events</div>
                <div className='flex justify-center items-center flex-wrap gap-10'>
                    {
                        Array(5).fill(true).map((item,idx)=>{
                            return <div className='bg-white h-[28rem] w-[25rem] rounded-2xl'>{idx}</div>
                        })
                    }
                </div>

    </div>
  )
}

export default TopEvents