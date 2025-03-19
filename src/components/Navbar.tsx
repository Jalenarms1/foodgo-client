import React from 'react'
import tempLogo from "../assets/temp-logo.png"
import { CiSettings } from 'react-icons/ci'


const Navbar = () => {
  return (
    <section className=" bg-orange-950 flex p-2 items-center justify-between shadow-sm shadow-zinc-500">
        <div className="flex items-center gap-2">
            <img src={tempLogo} alt="" className="w-12 h-12" />
            <p className="text-orange-300 font-semibold text-xl">Food&go</p>
        </div>
        <CiSettings className='text-2xl active:text-zinc-500 text-zinc-300'/>
        
    </section>
  )
}

export default Navbar
