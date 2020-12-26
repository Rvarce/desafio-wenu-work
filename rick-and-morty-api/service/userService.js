const User = require('../models/user')
const password = require('passport')
const passport = require('passport')

const UserService = {
    test: async () => {
        try {
            return 'Test service ok'
        } catch (error) {
            return error
        }
    },
    // authentication: async ({ mail, password }) => {
    //     try {
    //         const user = await User.findOne({ mail })

    //         if (!user) return false
    //         const isMatch = await user.matchPassword(password)
    //         return { user, isMatch}

    //     } catch (error) {
    //         return error
    //     }
    // },
    // register: async (user) => {
    //     passport.authenticate('signup', {session: false})


    //     const newUser = new User(user)
    //     console.log('newUser', newUser)
    //     try {
    //         let user = await newUser.save()
    //         return user
    //     } catch (error) {
    //         return error
    //     }
    // },
    getAllUser: async () => {
        const users = await User.find({})
        return users || []
    },
    deleteUser: async ({ id }) => {
        try {
            return await User.findOneAndDelete(
                { _id: id },
                { isEndangered: false }
            )
        } catch (error) {
            return error
        }
    }
}


module.exports = UserService