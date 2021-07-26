const express = require('express')
const  router  = new express.Router()
const Myroutes = require('../database/models/allRoutes.model')
const routesController = require('../app/controllers/routes.controller')

router.post('/add', Myroutes.addRoute)
router.get('/all', Myroutes.getAll)
router.post('/addRole/:id', Myroutes.addRoute)
module.exports = router