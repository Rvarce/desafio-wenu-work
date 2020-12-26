const express = require('express')
const endpoint = 'character'
const passport = require('passport')

const characterService = require('../service/characterService')

characterApi = app => {
    const router = express.Router()
    app.use(`/api/${endpoint}`, router)

    router.get('/test', async (req, res, next) => {
        try {
            const test = await characterService.test()
            return res.status(200).send({
                message: test
            })

        } catch (error) {
            next(error)
        }
    })

    router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        const { status, gender } = req.query

        try {
            const character = await characterService.getCharacters({ status, gender })
            res.status(200).json({
                data: character.data,
                message: 'Character listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/getfavorite/:idUser', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        const { idUser } = req.params
        try {
            const favorites = await characterService.getFavorites({ idUser })
            res.status(200).json({
                data: favorites,
                message: 'Favorites listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/savefavorite', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        const { idCharacter, idUser } = req.body
        console.log({ idCharacter, idUser })
        try {
            const characterFavorite = await characterService.saveFavorites({ idCharacter, idUser })
            res.status(201).json({
                data: characterFavorite,
                message: 'Favorite saved'
            })
        } catch (error) {
            next(error)
        }
    })

    router.delete('/deletefavorite', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        const { idCharacter, idUser } = req.body
        try {
            const favoriteDelete = await characterService.deleteFavorite({ idCharacter, idUser })
            res.status(200).json({
                data: favoriteDelete,
                message: 'Favorite deleted'
            })
        } catch (error) {
            next(error)
        }
    })

}

module.exports = characterApi