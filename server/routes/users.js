const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/auth', UserController.checkAuth)


module.exports = router