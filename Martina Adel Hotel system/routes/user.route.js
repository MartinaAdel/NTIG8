const express = require('express')
const router = new express.Router()
const userController = require('../app/controllers/user.controller')
const auth = require('../app/middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', auth,userController.logout)
router.post('/logoutAll', auth,userController.logoutAll)
router.post('/me', auth,userController.me)

router.get('/showAll', auth,userController.showAll)

module.exports=router