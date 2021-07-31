const express = require('express')
const router = new express.Router()
const roomController = require('../app/controllers/room.controller')
const auth = require('../app/middleware/auth')

router.post('/add', auth, roomController.add)
router.get('/allRooms', auth, roomController.getMyRooms)
router.post('/changeStatus/:id', auth, roomController.changeStatus)

module.exports=router