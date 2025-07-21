import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import type { PropsWithChildren } from "react"


type RequireNoAuthProps = PropsWithChildren<{}>

const RequireNoAuth = ({ children }: RequireNoAuthProps) => {

    const user = useAppSelector(store => store.user)
    if (user.username) {
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}

export default RequireNoAuth