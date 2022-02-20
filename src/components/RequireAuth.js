import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { state } from "../AppState"
import { useSnapshot } from "valtio"

const RequireAuth = ({ children }) => {
    const location = useLocation()
    const snap = useSnapshot(state)

    if (!snap.loggedIn) { // tady pridelat kontrolu prihlaseni
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
