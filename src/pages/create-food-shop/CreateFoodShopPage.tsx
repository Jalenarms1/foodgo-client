import React, { useEffect, useRef, useState } from 'react'
import { FoodCategory, FoodShop } from '../../types'
import { MdFileUpload } from "react-icons/md";
import { api, API_ROOT } from '../../utils';


const CreateFoodShopPage = () => {
  const fileDialogRef = useRef(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState<boolean>(false)
  const [foodShop, setFoodShop] = useState<FoodShop>({isDeliveryAvailable: isDeliveryAvailable, foodCategory: "American", logo: ""} as FoodShop)
  console.log(foodShop)
  console.log(isDeliveryAvailable)

  useEffect(() => {
    if (logo) {
      const reader = new FileReader()

      reader.onloadend = (e) => {
        setFoodShop({...foodShop, logo: e.target.result as string})
      }

      reader.readAsDataURL(logo)
    }
  }, [logo])

  const submitFoodShop = async () => {
    const data = await api.post("/api/food-shop", foodShop)

    console.log(data);
  }

  return (
    <div className='min-h-screen flex flex-col p-5 gap-7'>
      <div className="flex flex-col gap-2">
        <p className='text-2xl text-orange-950 font-bold font-mono'>Create food shop</p>
        <p className='text-sm text-zinc-500'>Please fill out all of your food shop's info to get started</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Details</p>
        <div className="border border-zinc-200 bg-zinc-100 rounded-sm p-3 flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <p className='text-orange-950'>Name</p>
            <input onChange={(e) => setFoodShop({...foodShop, label: e.target.value})} type="text" className='bg-white rounded-sm p-2 shadow-sm ' />
          </div>

          <div className="flex flex-col gap-2">
            <p className='text-orange-950'>Write a bio for your shop</p>
            <textarea onChange={(e) => setFoodShop({...foodShop, bio: e.target.value})} className='bg-white rounded-sm p-2 shadow-sm resize-none' rows={5} />
          </div>

          <div className="flex flex-col gap-2">
            <p className='text-orange-950'>Choose a category that best describes your shop</p>
            <select name="" id="" value={foodShop.foodCategory} onChange={(e) => setFoodShop({...foodShop, foodCategory: e.target.value as FoodCategory})}>
              {Object.values(FoodCategory).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className='text-orange-950'>Upload your shop's logo</p>
           {foodShop.logo == "" ? <button onClick={() => fileDialogRef.current.click()} className='flex items-center gap-2 p-2 border border-zinc-200 rounded-sm bg-white'>
              <MdFileUpload  className='text-lg'/>
              <p className='text-zinc-600'>Choose an image</p>
            </button> : <button onClick={() => fileDialogRef.current.click()} className='flex items-center gap-2 p-2 border border-zinc-200 rounded-sm bg-white'>
              <img src={foodShop.logo as string} alt="" className='w-10 h-10' />
              <p className='text-zinc-600'>{logo.name}</p>
            </button>}
            <input ref={fileDialogRef} onChange={(e) => setLogo(e.target.files[0])} type="file" className='bg-white rounded-sm p-2 shadow-sm hidden' />
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Location</p>
        <div className="border border-zinc-200 bg-zinc-100 rounded-sm p-3 flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <p className='text-orange-950'>Enter the current/permanent location for your shop</p>

            <div className="flex flex-col">
              <p className='text-sm text-zinc-500'>Address</p>
              <input onChange={(e) => setFoodShop({...foodShop, address: e.target.value})} type="text" className='bg-white rounded-sm p-2 shadow-sm ' />
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col w-3/4">
                <p className='text-sm text-zinc-500'>City</p>
                <input onChange={(e) => setFoodShop({...foodShop, city: e.target.value})} type="text" className='bg-white rounded-sm p-2 shadow-sm ' />
              </div>
              <div className="flex flex-col w-1/4">
                <p className='text-sm text-zinc-500'>State</p>
                <input onChange={(e) => setFoodShop({...foodShop, state: e.target.value})} type="text" className='bg-white rounded-sm p-2 shadow-sm ' />
              </div>


            </div>
            <div className="flex flex-col w-1/4">
              <p className='text-sm text-zinc-500'>Zipcode</p>
              <input onChange={(e) => setFoodShop({...foodShop, zipCode: e.target.value})} type="text" className='bg-white rounded-sm p-2 shadow-sm ' />
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Delivery</p>
        <div className="border border-zinc-200 bg-zinc-100 rounded-sm p-3 flex flex-col gap-7">
          <div className="flex items-center gap-4">
            <input type="radio" name='deliveryAvailable' checked={foodShop.isDeliveryAvailable} onChange={(e) => setFoodShop({...foodShop, isDeliveryAvailable: e.target.checked})} id="isAvailable" />
            <label htmlFor="isAvailable" className={`${!isDeliveryAvailable ? "text-zinc-400" : ""}`}>Available</label>

            <input type="radio" name='deliveryAvailable' checked={!foodShop.isDeliveryAvailable} onChange={(e) => setFoodShop({...foodShop, isDeliveryAvailable: !e.target.checked})} id="isNotAvailable" />
            <label htmlFor="isNotAvailable" className={`${isDeliveryAvailable ? "text-zinc-400" : ""}`}>Not Available</label>
          </div>

          {foodShop.isDeliveryAvailable && <div className='flex flex-col gap-2'>
              <div className="flex flex-col w-1/2">
                <p className='text-sm text-zinc-400'>Fee</p>
                <input onChange={(e) => parseFloat(e.target.value) > 0 ? setFoodShop({...foodShop, deliveryFee: parseFloat(e.target.value)}) : null} type="number" min={0} className='bg-white rounded-sm p-2 shadow-sm ' />
              </div>
              <div className="flex flex-col w-1/2">
                <p className='text-sm text-zinc-400'>Max Distance (mi)</p>
                <input onChange={(e) => parseFloat(e.target.value) > 0 ? setFoodShop({...foodShop, maxDeliveryRadius: parseInt(e.target.value)}) : null} type="number" className='bg-white rounded-sm p-2 shadow-sm ' min={0} />
              </div>
            </div>
          }

        </div>
      </div>

      <button onClick={submitFoodShop} className='w-full bg-orange-950 rounded-md p-2 text-white active:bg-orange-900 active:scale-[.95]'>Create</button>
    </div>
  )
}

export default CreateFoodShopPage
