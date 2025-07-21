import Header from "./Header"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout