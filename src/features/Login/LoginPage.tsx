import { useState } from "react"
import { fetchUserByEmail } from "../../app/slices/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const { status, error } = useAppSelector(state => state.user)

    function handleLogin() {
        dispatch(fetchUserByEmail({ email: username, password: password }))
    }

    if (status === 'loading') return <div>Loading...</div>
    if (error) return <div>Error...</div>

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center border justify-center gap-2 border-black w-[400px] h-[500px]">
                <div className="flex flex-row items-center gap-2">
                    <p>Name:</p>
                    <input placeholder="name..." value={username} onChange={(e) => setUsername(e.target.value)} className="border border-black p-2"></input>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <p>Password:</p>
                    <input placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} className="border border-black p-2"></input>
                </div>
                <button className="border border-black p-2" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default LoginPage