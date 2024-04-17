const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')
const goodsRouter = require('./controllers/goods')

mongoose.connect(config.MONGO_URI)
     .then(() => logger.info('connected to mongodb'))
     .catch(() => logger.error(error.message))

const app = express()

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/goods', goodsRouter)

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)

module.exports = app