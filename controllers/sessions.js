const db = require('../models')

// ROUTES
// LOGIN
const login = (req, res) => {
    req.session.username = req.body.username
    req.session.loggedIn = true
    res.redirect('/')
}

const logout = async (req, res) => {
    try {
        await req.logout()
        res.redirect('/')
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

module.exports = { login, logout }