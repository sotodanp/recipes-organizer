import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"
import { auth } from "../firebase/config"

export const useLogout = () => {
    const [isCancelled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)


        // sign the user out
        try {
            await auth.signOut()

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })


            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { logout, error, isPending }
}
