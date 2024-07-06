import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"


export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("Auth context can be used only inside auth provider")
    }
    return context
}