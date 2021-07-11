const express = require('express')
const router = new express.Router()
const myController = require('../controllers/myController.controller')

router.get('', myController.renderApiData)
// router.get('/:langID', myController.renderApiData)

router.get('/article/:langID', myController.renderApiData)
router.get('/article/:langID/:articleID', myController.getSingle)
module.exports = router