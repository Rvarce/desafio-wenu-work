const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../config')
const User = require('../models/user')

passport.use('signup', new localStrategy(
    {
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, mail, password, done) => {
        const newUser = req.body
        try {
            const existMail = await User.find({ mail: newUser.mail })
            if (existMail.length > 0) {
                return done(null, false, { message: 'Email ya registrado' })
            }
            const user = await User.create(newUser)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use('login', new localStrategy(
    {
        usernameField: 'mail',
        passwordField: 'password',
    },
    async (mail, password, done) => {
        try {
            const user = await User.findOne({ mail })

            if (!user) {
                return done(null, false)
            }
            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return done(null, false)
            }

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }
))

passport.use('jwt', new Strategy({
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token)
    } catch (error) {
        done(error)
    }
}))
