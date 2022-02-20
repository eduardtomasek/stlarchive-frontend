import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { state } from "../AppState"
import { useSnapshot } from "valtio"

const LoginPage = () => {
    const snap = useSnapshot(state)

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/app"

    function handleSubmit (event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const userName = formData.get('username')
        const password = formData.get('password')

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password,
            })
        }).then(async response => {
            if (!response.ok) {
                if (response.status === 400) {
                    console.log('Please fill all the fields correctly!')
                } else if (response.status === 401) {
                    console.log('Invalid email and password combination.')
                } else {
                    console.log('Generic error!')
                }

                setTimeout(() => { navigate(from, { replace: true }) }, 1000)
            } else {
                const data = await response.json()
                state.loggedIn = true
                state.token = data.token

                setTimeout(() => { navigate(from, { replace: true }) }, 1000)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input name="username" type="text" />
            </label>
            <label>
                <p>Password</p>
                <input name="password" type="password" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default LoginPage
