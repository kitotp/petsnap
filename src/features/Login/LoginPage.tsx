
const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center border justify-center gap-2 border-black w-[400px] h-[500px]">
                <div className="flex flex-row items-center gap-2">
                    <p>Name:</p>
                    <input placeholder="name..." className="border border-black p-2"></input>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <p>Password:</p>
                    <input placeholder="password..." className="border border-black p-2"></input>
                </div>
                <button className="border border-black p-2">Login</button>
            </div>
        </div>
    )
}

export default LoginPage