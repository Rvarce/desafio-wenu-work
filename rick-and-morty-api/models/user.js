const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        next(error)
    }

})

UserSchema.methods.matchPassword = async function (password) {
    var user = this
    try {
        return await bcrypt.compare(password, user.password)
    } catch (error) {
        return error
    }
}

module.exports = model('users', UserSchema)