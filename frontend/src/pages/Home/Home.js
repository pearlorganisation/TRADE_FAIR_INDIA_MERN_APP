import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import CommonQuestion from '../../components/CommonQuestion/CommonQuestion'
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents'

const Home = () => {
  return (
    <div className=''>
      <HeroSection/>
      <UpcomingEvents/>
      <CommonQuestion/>
    </div>
  )
}

export default Home