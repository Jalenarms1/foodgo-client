export const AUTH_KEY="foodgo-auth"
export const API_ROOT="http://localhost:3535"

export const api = {
    get: async (path: string): Promise<Response> => {
        try {
            const token = localStorage.getItem(AUTH_KEY) ?? ""
            const resp = await fetch(API_ROOT + path, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            return resp
            
        } catch (error) {
            console.log(error);
            
        }
    },

    post: async (path: string, data: any): Promise<Response> => {
        try {
            const token = localStorage.getItem(AUTH_KEY) ?? ""
            const resp = await fetch(API_ROOT + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify(data)
            })

            return resp
            
        } catch (error) {
            console.log(error);
            
        }
    },
    delete: async (path: string): Promise<Response> => {
        try {
            const token = localStorage.getItem(AUTH_KEY) ?? ""
            const resp = await fetch(API_ROOT + path, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
            })

            return resp
            
        } catch (error) {
            console.log(error);
            
        }
    }

}