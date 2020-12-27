const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../config')
const User = require('../models/user')

const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    algorithms: ['RS256'],
    ignoreExpiration: false,
    jsonWebTokenOption: {
        complete: false,
        clocktolerance: '',
        maxAge: '2d', //2 dias
        clockTimestamp: '100'
    }
}

passport.use('signup', new localStrategy(
    {
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, mail, password, done) => {
        const newUser = req.body
        try {
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
            console.log('user', user)

            if (!user) {
                return done(null, false, { message: 'Usuario y/o contraseña inválida' })
            }
            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return done(null, false, { message: 'Usuario y/o contraseña inválida' })
            }

            return done(null, user, { message: 'Autenticación exitosa' })

        } catch (error) {
            return done(error)
        }
    }
))

passport.use('jwt', new Strategy({
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()// .fromAuthHeaderWithScheme('jwt')
}, async (token, done) => {
    console.log(token)
    try {
        return done(null, token)
    } catch (error) {
        done(error)
    }
}))



// passport.serializeUser((user, done) => {
//     done(null, user._id)
// })

// passport.deserializeUser((_id, done) => {
//     User.findById(_id, (err, done) => {
//         done(err, user)
//     })
// })

// const { Strategy, ExtractJwt } = require('passport-jwt')
// const User = require('../models/user')
// const { config } = require('../config')

// const passport = (passport) => {
//     const options = {}
//     options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
//     options.secretOrKey = config.jwtSecret

//     const strategy = new Strategy(options, async (payload, done) => {
//         try {
//             const user = await User.findOne({ _id: payload._id })
//             if (user) {
//                 done(null, user)
//             } else {
//                 done(null, false)
//             }
//         } catch (error) {
//             return done(error, false)
//         }

//     })

//     passport.use(strategy)
// }

// module.exports = passport