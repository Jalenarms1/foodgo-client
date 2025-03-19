import React, { useEffect, useState } from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import ScheduleDaySlot from './ScheduleDaySlot';
import { type FoodShopSchedule, UserAccount } from '../../types';
import { api } from '../../utils';

export type ScheduleMap = Record<string, FoodShopSchedule[]>;

const ScheduleWidget = ({user}: {user: UserAccount}) => {
    const [schedule,setSchedule] = useState<ScheduleMap>({})
    console.log(schedule);
    const [weekDates, setWeekDates] = useState<Date[]>([])
    
    const getUserSchedule = async () => {
        setSchedule({})
        const resp = await api.get("/api/food-shop-schedule/" + user?.foodShop?.id)

        const dates = await resp.json()
        if (dates) {
            setSchedule(dates.reduce((acc: ScheduleMap, obj: FoodShopSchedule) => {
                console.log(obj.openDt);
                
                if (!acc[obj.openDt]) { acc[obj.openDt] = [] }
    
                acc[obj.openDt].push(obj)
                acc[obj.openDt].sort((a, b) => a.openTm < b.openTm ? -1 : 1)
    
                return acc
            }, {}))

        }


    }

    const getCurrentWeekDates = () => {
        const today = new Date(); // Get today's date
        const weekDates = [];
    
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i); // Get the next 7 days including today
            weekDates.push(date); // Format YYYY-MM-DD
        }

        console.log(weekDates);
        setWeekDates(weekDates)
    
    };

    useEffect(() => {
        if (user) {
            getUserSchedule()
            
            getCurrentWeekDates()
        }
    }, [user])

    useEffect(() => {
    },[])

    const onUpdate = () => {
        getUserSchedule()
            
    }

  return (
    <div className="flex flex-col shadow-sm shadow-zinc-300 p-4 rounded-sm gap-5">
        <div className='flex items-center gap-2 border-b border-zinc-200 pb-2'>
            <FaRegCalendarAlt />
            <p className='font-semibold'>Schedule</p>
        </div>

        <div className="flex w-full">
            <div className="flex flex-col gap-8 w-full">
                {weekDates.map(d => (
                    <>
                        {<ScheduleDaySlot key={d.toDateString()} d={d} foodShopId={user?.foodShop?.id} schedule={schedule} onUpdate={onUpdate} />}
                    
                    </>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default ScheduleWidget
