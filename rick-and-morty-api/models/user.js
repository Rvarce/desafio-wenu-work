const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    access: {
        mail: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    }
}, {
    timestamps: true
})

userSchema.methods.hashPass = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

module.exports = model('users', userSchema)