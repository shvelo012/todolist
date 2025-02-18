const joi = require('joi')

const validateCreateUser = (req, res, next) => {
    const user = req.body

    const schema = joi.object().keys({
        firstName: joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/).required().error(() => '"first name" invalid'),
        lastName: joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/).required().error(() => '"last name" invalid'),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const {
        error
    } = joi.validate(user, schema)

    if (!error) {
        return next()
    }

    const {
        message,
        context
    } = error.details[0]

    res.json({
        message,
        status: 'fail',
        field: context.key
    })
}

module.exports = {
    validateCreateUser
}
