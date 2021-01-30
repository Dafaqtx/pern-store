const ApiError = require('../error/ApiError')

class UserController {
    async signup(req, res) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    async signin(req, res) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    async checkAuth(req, res, next) {
        try {
            const { id } = req.params

            if (!id) {
                return next(ApiError.badRequest('No user id'))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()