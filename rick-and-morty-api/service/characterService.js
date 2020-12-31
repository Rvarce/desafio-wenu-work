const url = 'https://rickandmortyapi.com/api'
const endpoint = 'character'
const axios = require('axios').default
const Favorite = require('../models/favorites')

const CharacterService = {
    test: async () => {
        try {
            return 'Test service ok'
        } catch (error) {
            return new Error(error)
        }
    },
    getCharacters: async (page = 1, status = '', gender = '', name = '') => {
        try {
            const characters = await axios.get(`${url}/${endpoint}?page=${page}&status=${status}&gender=${gender}&name=${name}`)
            return characters || []
        } catch (error) {
            return new Error(error)
        }
    },
    getFavorites: async ({ user }) => {
        try {
            const idCharacterUser = await Favorite.find({ idUser: user._id })
            if (idCharacterUser.length === 0) return {}

            const idCharacters = idCharacterUser.map(fav => fav.idCharacter)

            const favorite = await axios.get(`${url}/${endpoint}/${idCharacters}`)
            
            return { favorite: Array.isArray(favorite.data) ? favorite.data : [favorite.data] } || []

        } catch (error) {
            return new Error(error)
        }
    },
    saveFavorites: async ({ idCharacter, idUser }) => {
        try {
            const exist = await Favorite.find({ idCharacter, idUser })
            if (exist.length === 0) {
                const favorite = new Favorite({ idCharacter, idUser })
                try {
                    return await favorite.save()
                } catch (error) {
                    return new Error(error)
                }
            } else {
                return { error: true , message: 'Personaje ya existe en favoritos'}
            }
        } catch (error) {
            return new Error(error)
            
        }

       
    },
    deleteFavorite: async ({ idCharacter, idUser }) => {
        try {
            return await Favorite.findOneAndDelete(
                { idCharacter, idUser },
                { isEndangered: false }
            )
        } catch (error) {
            return new Error(error)
        }
    }
}


module.exports = CharacterService