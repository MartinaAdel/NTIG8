const express = require('express')
const router = new express.Router()
const reservationController = require('../app/controllers/reservation.controller')
const auth = require('../app/middleware/auth')

router.post('/add', auth, reservationController.add)
router.get('/all', auth, reservationController.getAllReservations)
router.get('/userReservation', auth, reservationController.getMyReservations)
router.post('/cancel/:id', auth, reservationController.cancel)

module.exports=router