import React from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'

const Register = () => {
  return (
    <main className="login-page">
        <div className="form-container">
            <h1>Register</h1>
            <form>
                <FormGroup label="Username" placeholder="Enter your username" />
                <FormGroup label="Email" placeholder="Enter your email" />
                <FormGroup label="Password" placeholder="Enter your password" />
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    </main>
  )
}

export default Register