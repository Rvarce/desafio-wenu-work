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
    getFavorites: async ({idUser}) => {
        try {
            const idCharacterUser = await Favorite.find({idUser})
            const ids = idCharacterUser.map( fav => fav.idCharacter )
            console.log(ids)

            const characters = await axios.get(`${url}/${endpoint}/${ids}`)
            return characters || []
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
    deleteFavorite: async ({ id }) => {
        try {
            return await Favorite.findOneAndDelete(
                { _id: id },
                { isEndangered: false }
            )
        } catch (error) {
            return error
        }
    }
}


module.exports = CharacterService

// class CharacterService {
//     // constructor() {
//     //     this.collection = 'character'
//     //     this.monboDB = new MongoLib()
//     // }

//     async getCharacters() {
//         const characters = await axios.get(`${characterMoks}${endpoint}`)
//         return characters || []
//     }
//     async getFavorite({ tags }) {
//         const query = tags && { tags: { $in: tags } }
//         const favorite = await this.mongodb.getFavorite(this.collection, query)
//         return favorite || []
//     }

//     async saveFavorite({ favorite }) {
//         const favoriteSaved = await this.mongodb.saveFavorite(this.collection, favorite)
//         return favoriteSaved || []
//     }
//     async deleteFavorite({ id }) {
//         const favoriteDeleted = await this.mongodb.deleteFavorite(this.collection, id)
//         return favoriteDeleted
//     }
// }