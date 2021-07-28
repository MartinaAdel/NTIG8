const express = require('express')
const  router  = new express.Router()
const routesController = require('../app/controllers/routes.controller')

router.post('/add', routesController.addRoute)
router.get('/all', routesController.getAll)
router.post('/addRole/:id', routesController.addRole)
module.exports = router