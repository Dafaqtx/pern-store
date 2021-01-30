const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart } = require('../models/')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email, role) => {
    return jwt.sign({
            id,
            email,
            role
        },
        process.env.SECRET_KEY, { expiresIn: '24h' }
    )
}

class UserController {
    async signup(req, res, next) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Incorrect email or password'))
            }

            const candidate = await User.findOne({ where: { email } })

            if (candidate) {
                return next(ApiError.badRequest('User already exsist'));
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, role, password: hashPassword })
            const cart = await Cart.create({ userId: user.id })
            const token = generateJwt(user.id, email, user.role)

            return res.json({ token })


        } catch (error) {
            console.log(error)
        }
    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(ApiError.badRequest('Wrong email or password'));
            }

            const token = generateJwt(user.id, user.email, user.role)

            return res.json({ token })
        } catch (error) {
            console.log(error)
        }
    }

    async checkAuth(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);

            return res.json({ token })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()