import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useTheme } from '../hooks/useTheme'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const { logout } = useLogout()
    const { color } = useTheme()
    const { user } = useAuthContext()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <NavLink className='brand' to='/'><h1>Cooking Ninja</h1></NavLink>
                <Searchbar />
                {/* <NavLink className='navlink' to='/create'>Create Recipe</NavLink> */}
                {!user && (<>
                    <NavLink className='navlink' to='/login'>Login</NavLink>
                </>)}
                {user && (
                    <>
                        <p className='welcomeMessage'>Hello, {user.displayName}</p>
                        <NavLink className='navlinkCreate' to='/create'>Create Recipe</NavLink>
                        <NavLink className='navlink' onClick={logout} to='/login'>Logout</NavLink>
                    </>)}
            </nav>
        </div>
    )
}

export default Navbar
