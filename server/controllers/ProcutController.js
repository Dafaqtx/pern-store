const path = require('path')
const mime = require('mime-types')
const { v4 } = require('uuid')
const ApiError = require('../error/ApiError');
const { Product, ProductInfo } = require('../models/');

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            const { image } = req.files;
            const fileExtension = mime.extension(image.mimetype)
            const fileName = `${v4()}.${fileExtension}`;
            image.mv(path.resolve(__dirname, '..', 'static', fileName))

            if (info) {
                const data = JSON.parse(info)
                Object.keys(data).forEach(async key => {
                    await ProductInfo.create({
                        [key]: data[key]
                    })
                })
            }

            const product = await Product.create({ name, price, brandId, typeId, image: fileName })

            return res.json(product)

        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        try {
            const { brandId, typeId, limit = 9, page = 1 } = req.query
            const offset = parseInt(page * limit - limit)
            const products = [];

            if (!brandId && !typeId) {
                const p = await Product.findAndCountAll({ limit, offset });
                products.push(p)
            }

            if (brandId && !typeId) {
                const p = await Product.findAndCountAll({ where: { brandId }, limit, offset });
                products.push(p)

            }

            if (!brandId && typeId) {
                const p = await Product.findAndCountAll({ where: { typeId }, limit, offset });
                products.push(p)

            }

            if (brandId && typeId) {
                const p = await Product.findAndCountAll({ where: { brandId, typeId }, limit, offset });
                products.push(p)

            }

            return res.json(products)

        } catch (error) {
            console.log(error)
        }
    }

    async get(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findOne({
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            })

            return res.json(product)

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new ProductController()