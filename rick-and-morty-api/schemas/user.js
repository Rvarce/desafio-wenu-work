const joi = require('@hapi/joi')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const userMailSchema = joi.string().email().normalize()
const userPassSchema = joi.string().min(4).max(15)

const createUserSchema = {
    mail: userMailSchema.required(),
    password: userPassSchema.required()
}

const updateUserSchema = {
    mail: userMailSchema,
    password: userPassSchema
}

module.exports = { userIdSchema, createUserSchema, updateUserSchema}