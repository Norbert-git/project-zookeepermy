const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessions')
const passport = require('passport')


// ROUTES
// LOGIN
router.post('/login', sessionsController.login)

// OAUTH
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
))

// AUTHENTICATE
router.get('/oauth2callback', passport.authenticate(
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
))

// DESTROY
//router.get('/logout', sessionsController.logout)
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router