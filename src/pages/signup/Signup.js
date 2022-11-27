import './Signup.css'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useSignup } from '../../hooks/useSignup'




const Signup = () => {

    const { mode, color } = useTheme()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const { signup, isPending, error } = useSignup()


    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName)



    }

    return (
        <form onSubmit={handleSubmit} className={`signup-form ${mode}`}>
            <h2>Signup</h2>
            <label>
                <span>Email:</span>
                <input type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            {/* <label>
                <span>Confirm Password:</span>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                />
            </label> */}
            <label>
                <span>Username:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    required
                />
            </label>
            {!isPending && <button className={`btn ${mode}`} style={{ background: color, color: '#e2e2e2' }}>Signup</button>}
            {isPending && <button className='btn' disabled>loading...</button>}
            {error && <p>{error}</p>}
        </form >
    )
}

export default Signup