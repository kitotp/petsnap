import { type PropsWithChildren } from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate } from 'react-router-dom'

type RequireAuthProps = PropsWithChildren<{}>

const RequireAuth = ({ children }: RequireAuthProps) => {
    const user = useAppSelector(store => store.user)

    if (!user.username || user.role === 'admin') {
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}

export default RequireAuth