const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/ProcutController')

router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.get)


module.exports = router