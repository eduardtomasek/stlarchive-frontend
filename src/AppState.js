import { proxy } from 'valtio'

const state = proxy({
    loggedIn: false,
    token: '',
})

export { state }