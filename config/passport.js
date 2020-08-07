const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')

// pulled from Brock's OAuth SEI class notes
// https://git.generalassemb.ly/SEI-CC/sei-students.git
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({
            googleId: profile.id
        }, function (err, user) {
            if (err) return cb(err);
            if (user) {
                // returning user
                if (!user.avatar) {
                    user.avatar = profile.photos[0].value;
                    user.save(function (err) {
                        return cb(null, user);
                    });
                } else {
                    return cb(null, user);
                }
            } else {
                // we have a new user!
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                })
                newUser.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                })
            }
        });
    }
))

// called everytime a user logs in
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// called with every user's request
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
})