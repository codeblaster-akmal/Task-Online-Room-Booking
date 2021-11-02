"use strict";

const router = require('express').Router();
const { findAllHotels, createHotel, updateHotel } = require('../controllers/hotelController');
const { validateUser } = require('../middlewares/validate-user');
const { verifyToken } = require('../middlewares/jwt-secure-api');

router.get('/hotels', verifyToken, findAllHotels);

router.post('/hotels', validateUser, createHotel);

router.put('/hotels', validateUser, updateHotel);

module.exports = router;