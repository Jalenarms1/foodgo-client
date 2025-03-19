import { useRef, useState } from "react"
import { API_ROOT, AUTH_KEY } from "../utils"


const Signup = () => {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmedPasswordRef = useRef(null) 
  const [confirmedPassErr, setConfirmedPassErr] = useState<boolean>(false) 


  const submitLogin = async () => {
    try {
        setConfirmedPassErr(true)
        const password = passwordRef.current.value
        if (password != confirmedPasswordRef.current.value) {
            setConfirmedPassErr(true)
            return
        }


        const resp = await fetch(API_ROOT + "/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        })

        const data = await resp.json()

        const { token } = data
        
        if (token) {
            localStorage.setItem(AUTH_KEY, token)
        }

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        <div className=" flex justify-center items-center p-8">
            <div className="flex flex-col gap-5  items-center border rounded-sm w-[90vw] h-[75vh] p-2 bg-zinc-100">
                <p className="text-2xl text-orange-950 font-semibold">Sign Up</p>
                <div className="px-8 w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm text-orange-950">Email</p>
                        <input ref={emailRef} type="text" name="email" placeholder="" className="bg-white rounded-md p-2" />     
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm text-orange-950">Password</p>
                        <input ref={passwordRef}  type="password" name="password" placeholder="" className="bg-white rounded-md p-2" />     
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm text-orange-950">Confirm Password</p>
                        <input ref={confirmedPasswordRef}  type="password" name="confirmPassword" placeholder="" className="bg-white rounded-md p-2" />     
                    </div>

                    <button onClick={submitLogin} type="submit" className="bg-orange-950 p-2 rounded-full w-full text-white mt-10">Continue</button>
                </div>


                <a href="/pages/login" className=" active:text-blue-400">Already have an account?</a>

            </div>

        </div>
    </>
  )
}

export default Signup
