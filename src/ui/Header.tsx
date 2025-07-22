import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../app/slices/userSlice'

const Header = () => {

    const user = useAppSelector(store => store.user)

    const dispatch = useAppDispatch()


    console.log(user)

    return (
        <div className='flex flex-row items-center justify-center gap-3 border border-black bg-yellow-100 p-4'>
            <Link to='/'>Home</Link>
            <Link to='/posts'>Posts</Link>
            {!user.username ? <Link to='/login'>Login</Link> : <button onClick={() => dispatch(logout())} className='cursor-pointer'>Logout</button>}
            {/* <Link to='/admin'>Admin</Link> */}
            {user.username && <Link to={`/profile/${user.id}`}>Profile</Link>}
        </div>
    )
}

export default Header