const express = require('express')
const  router  = new express.Router()
const rolesController = require('../app/controllers/roles.controller')

router.post('/add', rolesController.addRole)
router.get('/all', rolesController.getAll)

module.exports = router