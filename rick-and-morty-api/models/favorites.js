var { Schema, model } = require('mongoose')

var favoritesSchema = Schema({
    idCharacter: Number,
    idUser: String
}, {
    timestamps: true
})


// var characterSchema = Schema({
//     name: String,
//     status: String,
//     species: String,
//     type: String,
//     gender: String,
//     origin: {
//         name: String,
//         url: String
//     },
//     location: {
//         name: String,
//         url: String
//     },
//     image: String,
//     episode: [String],
//     url: String,
//     created: String,
//     favorite: {
//         type: Boolean,
//         default: true
//     }
// })

module.exports = model('favorites', favoritesSchema)