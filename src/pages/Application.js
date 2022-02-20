import React from 'react'
import { Link, Outlet } from "react-router-dom"

import AnonymousImage from '../assets/img/anon.svg'

const ApplicationPage = () => {
    return <div>
        Authorized area only (<Link to="/">Homepage</Link>)
        <br></br>
        <img src={AnonymousImage} />
        ApplicationPage (<Link to="/app/projects">Show project page</Link>)
        <Outlet />
    </div>
}

export default ApplicationPage
