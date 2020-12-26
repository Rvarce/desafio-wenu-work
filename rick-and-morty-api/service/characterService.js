const url = 'https://rickandmortyapi.com/api'
const endpoint = 'character'
const axios = require('axios').default
const Favorite = require('../models/favorites')

const CharacterService = {
    test: async () => {
        try {
            return 'Test service ok'
        } catch (error) {
            return error
        }
    },
    getCharacters: async ({ status = '', gender = '' }) => {
        console.log(status, gender)
        try {
            const characters = await axios.get(`${url}/${endpoint}/?status=${status}&&gender=${gender}`)
            return characters || []
        } catch (error) {
            return error
        }
    },
    getFavorites: async ({ idUser }) => {
        try {
            const idCharacterUser = await Favorite.find({ idUser })
            console.log(idCharacterUser)
            if (idCharacterUser.length === 0) return []

            const idCharacters = idCharacterUser.map(fav => fav.idCharacter)

            const characters = await axios.get(`${url}/${endpoint}/${idCharacters}`)

            return { characters: characters.data } || []

        } catch (error) {

        }
    },
    saveFavorites: async ({ idCharacter, idUser }) => {
        const favorite = new Favorite({ idCharacter, idUser })
        console.log(favorite)
        try {
            return await favorite.save()
        } catch (error) {
            return error
        }
    },
    deleteFavorite: async ({ idCharacter, idUser }) => {
        try {
            return await Favorite.findOneAndDelete(
                { idCharacter, idUser },
                { isEndangered: false }
            )
        } catch (error) {
            return error
        }
    }
}


module.exports = CharacterService