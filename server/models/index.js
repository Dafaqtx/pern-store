const sequilize = require('../core/db');
const { DataTypes } = require('sequelize');

const User = sequilize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, uniq: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'CLIENT' }
})

const Cart = sequilize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const CartProduct = sequilize.define('cart_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Product = sequilize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, uniq: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequilize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, uniq: true, allowNull: false },

})

const Brand = sequilize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, uniq: true, allowNull: false },
})

const Rating = sequilize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.STRING, allowNull: false },
})

const ProductInfo = sequilize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequilize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    ProductInfo,
    Type,
    Brand,
    Rating,
    TypeBrand
}