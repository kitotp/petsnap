import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const Header = () => {

    const user = useAppSelector(store => store.user)
    console.log(user)

    return (
        <div className='flex flex-row items-center justify-center gap-3 border border-black bg-yellow-100 p-4'>
            <Link to='/'>Home</Link>
            <Link to='/posts'>Posts</Link>
            {!user.username && <Link to='/login'>Login</Link>}
            {/* <Link to='/admin'>Admin</Link> */}
        </div>
    )
}

export default Header