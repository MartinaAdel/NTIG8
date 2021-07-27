const express= require('express')
const cors = require('cors')
require('dotenv').config()
require('../database/connection')

const userRoutes = require('../routes/user.route')
const roomRoutes = require('../routes/room.route')
const rolesRoutes = require('../routes/roles.routes')
const routesRoutes = require('../routes/routes.routes')

const app = express()
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',userRoutes)
app.use('/room',roomRoutes)
app.use('/role',rolesRoutes)
app.use('/route',routesRoutes)

module.exports = app