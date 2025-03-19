import React from 'react'
import { useUser } from '../../hooks/useUser'
import { API_ROOT } from '../../utils'
import { CiSettings } from "react-icons/ci";
import ScheduleWidget from './ScheduleWidget';


const Dashboard = () => {
  const {user} = useUser()
  return (
    <div className='min-h-screen flex flex-col p-4 gap-8'>
      <div className="flex flex-col p-2 bg-zinc-100 rounded-sm shadow-sm">
        <div className="flex items-center  gap-5">
          <img src={user ? `${API_ROOT}/${user?.foodShop?.logo}` : ""} alt="logo" className='w-12 h-12 rounded-sm' />
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col">
              <p className='text-sm'>{user?.foodShop?.label}</p>
              <a href={`http://${user?.foodShop?.urlSlug}.localhost:5173`} className='text-xs underline text-blue-500 font-sans w-fit'>Visit Site</a>
              <p className='text-xs mt-2 text-zinc-400'>{user?.foodShop?.address} {user?.foodShop?.city} {user?.foodShop?.state} {user?.foodShop?.zipCode}</p>
            </div>
          </div>
        </div>

      </div>
      <ScheduleWidget user={user} />
    </div>
  )
}

export default Dashboard
