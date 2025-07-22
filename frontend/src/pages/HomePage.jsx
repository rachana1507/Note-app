import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false)
    return (
    <div className='min-h-screen'>
        <Navbar />
        {/* <div className="p-4 text-center text-balck">HomePage Content</div> Test element */}
        {isRateLimited && <RateLimitedUI />}
    </div>
    )
}

export default HomePage