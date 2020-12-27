const User = require('../models/user')
const password = require('passport')
const passport = require('passport')

const UserService = {
    test: async () => {
        try {
            return 'Test service ok'
        } catch (error) {
            return new Error(error)

        }
    },
    getAllUser: async () => {
        try {
            const users = await User.find({}) 
            return users || []
        } catch (error) {
            return new Error(error)
        }
    },
    deleteUser: async ({ id }) => {
        try {
            return await User.findOneAndDelete(
                { _id: id },
                { isEndangered: false }
            )
        } catch (error) {
            return new Error(error)
        }
    }
}


module.exports = UserService