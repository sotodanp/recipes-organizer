import './Login.css'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLogin } from '../../hooks/useLogin'
import { NavLink } from 'react-router-dom'

const Login = () => {
    const { mode, color } = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className={`login-form ${mode}`}>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className={`btn ${mode}`} style={{ backgroundColor: color, color: '#e2e2e2' }}>Login</button>}

            {isPending && <button className={`btn ${mode}`} style={{ backgroundColor: color, color: '#e2e2e2' }}>Loading...</button>}
            {error && <p>{error}</p>}
            <br></br>
            <br></br>
            <p className='signup'>Don't have an account? <br></br>
                <NavLink to='/signup'>Signup Now</NavLink>
            </p>
        </form >
    )
}

export default Login

