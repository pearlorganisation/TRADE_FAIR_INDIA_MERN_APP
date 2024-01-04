import React from 'react'
import PopularEventCarousel from './PopularEventCarousel'

const PopularTradeEvent = () => {
  return (
    <div className='min-h-[50dvh] bg-transparent container space-y-12 mx-auto'>
         <div className='text-center text-[#00373E] font-medium text-4xl'>Popular Trade Events</div>
         <PopularEventCarousel/>
    </div>
  )
}

export default PopularTradeEvent