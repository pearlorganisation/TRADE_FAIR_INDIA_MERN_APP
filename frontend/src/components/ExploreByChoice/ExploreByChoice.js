import React from 'react'

const ExploreByChoice = () => {
  return (
    <div className='container mx-auto min-h-[50dvh] flex flex-col gap-12 justify-center items-center'>
        <div className='text-center text-[#00373E] font-medium text-4xl'>Explore By Choice</div>
        <div className='flex justify-center items-center flex-wrap w-[60%] gap-10'>
            {
                ["🎉 Weekend","😍 Free","📆 This Month","🌟 Tomorrow","🍭 Today"].map(item =>{
                    return <div className='bg-white font-medium text-2xl min-w-[15rem] text-center py-3 rounded-3xl cursor-pointer hover:scale-110 hover:shadow-2xl transition-all'>{item}</div>
                })
            }
        </div>
    </div>
  )
}

export default ExploreByChoice