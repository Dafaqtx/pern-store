require('dotenv').config()
const path = require('path')
const express = require('express');
const sequilize = require('./core/db');
const models = require('./models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.use(errorHandler)

const start = async() => {
    try {
        await sequilize.authenticate();
        await sequilize.sync();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

    } catch (error) {
        console.log(error)
    }
}

start();