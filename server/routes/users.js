const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/auth', authMiddleware, UserController.checkAuth)


module.exports = router