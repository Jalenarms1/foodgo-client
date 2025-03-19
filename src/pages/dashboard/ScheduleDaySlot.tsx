import React, { useRef, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";
import { FoodShopSchedule } from '../../types';
import { api } from '../../utils';
import { ScheduleMap } from './ScheduleWidget';



const ScheduleDaySlot = ({d, foodShopId, schedule, onUpdate}: {d: Date, foodShopId: string, schedule: ScheduleMap, onUpdate: () => void}) => {
    const [showAddTime, setShowAddTime] = useState<boolean>(false) 
    const [openTm, setOpenTm] = useState("05:30")
    const [closeTm, setCloseTm] = useState("13:30")
    const [isInvalidTime, setIsInvalidTime] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<string>("")
    console.log(schedule);
    
    const submitNewTime = async () => {
        setIsInvalidTime(false)

        if (!validateTime(openTm, true) || !validateTime(closeTm, false)) { return }

        const opendateTime = new Date(d)
        opendateTime.setHours(parseInt(openTm.split(":")[0]), parseInt(openTm.split(":")[1]))

        const closedateTime = new Date(d)
        closedateTime.setHours(parseInt(closeTm.split(":")[0]), parseInt(closeTm.split(":")[1]))

        const schd: FoodShopSchedule = {
            id: crypto.randomUUID(),
            foodShopId,
            openDt: `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`,
            closeDt: `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`,
            openTm: opendateTime.valueOf(),
            closeTm: closedateTime.valueOf(), 
            createdAt: Math.floor(Date.now() / 1000)
        }

        console.log(schd)

        const resp = await api.post("/api/food-shop-schedule", schd)
        
        console.log(resp)

        if (resp.status == 200) {
            onUpdate()
        }
    }

    const formatTime = (date: number) => {
        console.log(date);

        const hour = new Date(date).getHours()
        const minute = new Date(date).getMinutes()
        const isAm = hour < 12
        
        return `${hour % 12 == 0 ? 12 : hour % 12}:${minute} ${isAm ? "AM" : "PM"}`
    }

    const validateTime = (timeStr: string, isOpenTm: boolean): boolean => {

        const datetime = new Date(d)
        datetime.setHours(parseInt(timeStr.split(":")[0]), parseInt(timeStr.split(":")[1]))

        if (isOpenTm) {
            if (datetime.valueOf() < Date.now()) { 
                setIsInvalidTime(true)
                return 
            }
            console.log(schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`]);
            
            if (schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`] && schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`].filter(t => t.openTm < datetime.valueOf() && t.closeTm > datetime.valueOf()).length > 0) {
                setIsInvalidTime(true)
                
                return false
            }
        } else {
            const opendateTime = new Date(d)
            opendateTime.setHours(parseInt(openTm.split(":")[0]), parseInt(openTm.split(":")[1]))

            if (datetime.valueOf() < opendateTime.valueOf() || (schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`] && schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`].filter(t => t.openTm < datetime.valueOf() && t.closeTm > datetime.valueOf()).length > 0)) { 
                setIsInvalidTime(true)
                return false 
            }

        }

        return true
    }
    
    const deleteSlot = async (id: string) => {
        const resp = await api.delete("/api/food-shop-schedule" + "/" + id)

        console.log(resp);

        onUpdate()
        
    }

  return (
    <div className="flex w-full flex-col gap-2">
        <div className="grid grid-cols-3  w-full">
            <p className='text-xs text-orange-900 w-full'>{d.getFullYear()}-{(`${d.getMonth() + 1}`).padStart(2, "0")}-{d.getDate()}</p>
            <div className="flex flex-col w-full gap-5 col-span-2">
                {schedule[`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`]?.map(t => (
                    <div className="flex w-full items-center gap-5 text-zinc-700 text-xs ">
                        <p>{formatTime(t.openTm)} to {formatTime(t.closeTm)}</p>
                        <button onClick={isDeleting != t.id ? () => setIsDeleting(t.id) : () => deleteSlot(t.id)} className={`text-xl  ${isDeleting != t.id ? "text-zinc-300" : "text-red-400"}`}>{isDeleting != t.id ? "-" : "x"}</button>
                    </div>
                ))}
                <div className="flex items-start mr-10">
                    <div className="flex w-full flex-col text-zinc-300 text-xs ">
                        -:- to -:-
                    </div>
                    <div className=" flex">
                        <button onClick={() => setShowAddTime(!showAddTime)} className=' '>
                            {showAddTime ? <CiCircleMinus className="active:text-zinc-500 text-zinc-400" /> : <IoIosAddCircleOutline className="active:text-zinc-500 text-zinc-400" />}
                            
                        </button>

                    </div>

                </div>

            </div>
        </div>
        <div className="flex flex-col">
            {showAddTime && <div className="flex items-center gap-5">
                <input 
                    type="time" 
                    value={openTm}
                    onChange={(e) => setOpenTm(e.target.value)}
                    className="border border-gray-200 px-1 text-sm rounded-md focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-gray-500">to</p>
                <input 
                    type="time" 
                    value={closeTm}
                    onChange={(e) => setCloseTm(e.target.value)}
                    className="border border-gray-200 px-1 text-sm rounded-md focus:ring-2 focus:ring-orange-500"
                />
                <button onClick={submitNewTime} className='bg-green-400 text-white px-2 py-1 rounded-sm'>
                    <p className='text-xs'>Add</p>
                    {/* <FaCheckSquare className='text-green-400 text-2xl' /> */}
                </button>
            </div>}
            {isInvalidTime && <p className='text-xs text-red-500 mt-2'>Please choose a valid time slot</p>}

        </div>

    </div>
  )
}

export default ScheduleDaySlot
