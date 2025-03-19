import { useEffect, useState } from "react"
import { FoodShop, UserAccount } from "../types"
import { API_ROOT, AUTH_KEY } from "../utils"


export const useUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<UserAccount | null>(null)

    const getUser = async () => {
        setIsLoading(true)
        const token = localStorage.getItem(AUTH_KEY) ?? ""
        const resp = await fetch(API_ROOT + "/api/get-me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        console.log(resp.status);
        

        const userAcct = await resp.json()

        setUser(userAcct)

        setIsLoading(true)
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    return {user, isLoading}
}