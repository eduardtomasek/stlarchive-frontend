import React from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useLocation, useNavigate } from 'react-router-dom'

import { state } from "../AppState"
import { useSnapshot } from "valtio"

function Copyright (props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                STL Archive
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

const LoginPage = () => {
    const snap = useSnapshot(state)

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/app/projects"

    function handleSubmit (event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const userName = formData.get('email')
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/*<FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default LoginPage
