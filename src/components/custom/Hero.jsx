import React from 'react'
import { Button } from "@/components/ui/button"
import {Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 '>
    <h1 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#f56551]'>Discover Your Next Adventure with the Power of AI: </span>
 Personalized Itineraries at Your FingerTips
</h1>
<p className='text-xl text-gray-500 text-center'>Say goodbye to generic travel plans! Let your personal AI trip planner craft unforgettable experiences with custom itineraries - all tailored to your interests, style, and budget.

</p>
<Link to={'/create-trip'}>

<Button>Get Started, It's Free</Button>
</Link>

<img src="./landing_page.png" alt=""  />
    </div>
  )
}

export default Hero
