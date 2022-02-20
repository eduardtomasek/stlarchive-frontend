import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import ApplicationPage from './pages/Application'
import LandingPage from './pages/Landing'
import ProjectsPage from './pages/Projects'
import LoginPage from './pages/Login'
import RequireAuth from './components/RequireAuth'

function App () {
    const [token, setToken] = useState()
    return (
        <HelmetProvider>
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>STL Archive</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Helmet>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/app" element={<RequireAuth><ApplicationPage /></RequireAuth>}>
                        <Route exact path='/app/projects' element={<ProjectsPage />} />
                    </Route>
                </Routes>
            </div>
        </HelmetProvider>
    )
}

export default App
