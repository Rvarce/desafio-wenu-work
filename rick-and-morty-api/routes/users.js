const express = require('express')
const endpoint = 'user'
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { config } = require('../config')

const userService = require('../service/userService')

userApi = app => {
    const router = express.Router()
    app.use(`/api/${endpoint}`, router)

    router.get('/test', async (req, res, next) => {
        try {
            const test = await userService.test()
            return res.status(200).send({
                message: test
            })

        } catch (error) {
            next(error)
        }
    })

    router.get('/', async (req, res, next) => {

        try {
            const users = await userService.getAllUser()
            res.status(200).json({
                users,
                message: 'User listed'
            })
        } catch (error) {
            next(error)
        }
    })
    router.post('/login', async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            console.log(user)
            try {
                if (err || !user) return next(err)

                req.login(user, { session: false }, async error => {
                    if (error) return next(error)

                    const body = { _id: user._id, name: `${user.name} ${user.firstName}` }
                    const token = jwt.sign(body, config.jwtSecret, { expiresIn: '7d' }) //expira en una semana
                    res.status(200).json({ token: `${token}`, message: 'Autenticación exitosa' })
                })
            } catch (error) {
                return next(error)
            }
        })(req, res, next)
    })

    router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
        res.status(201).json({
            user: req.user,
            message: 'User registered'
        })
    })

    router.delete('/deleteuser/:id', async (req, res, next) => {
        const { id } = req.params
        console.log(id)
        try {
            const userDelete = await userService.deleteUser({ id })
            res.status(200).json({
                data: userDelete,
                message: 'User deleted'
            })
        } catch (error) {
            next(error)
        }
    })

}

module.exports = userApi