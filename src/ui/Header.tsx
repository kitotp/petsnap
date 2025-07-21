import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex flex-row items-center justify-center gap-3 border border-black bg-yellow-100 p-4'>
            <Link to='/'>Home</Link>
            <Link to='/posts'>Posts</Link>
            <Link to='/login'>Login</Link>
            <Link to='/admin'>Admin</Link>
        </div>
    )
}

export default Header