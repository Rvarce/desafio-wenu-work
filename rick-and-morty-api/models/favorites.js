var { Schema, model } = require('mongoose')

var FavoritesSchema = Schema({
    idCharacter: Number,
    idUser: String
}, {
    timestamps: true
})

module.exports = model('favorites', FavoritesSchema)