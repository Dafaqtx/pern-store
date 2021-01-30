const Router = require('express');
const router = new Router();

const userRouter = require('./users');
const typeRouter = require('./types');
const brandRouter = require('./brands');
const productRouter = require('./products');

router.use('/users', userRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/products', productRouter);

module.exports = router;