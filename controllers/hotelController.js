"use strict";

const Hotel = require('../models/hotel');

const findAllHotels = async (req, res) => {
  try {
    const hotels = await new Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json(error);
  }
}

const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const newHotel = await hotel.save();
    res.status(200).json(newHotel);
  } catch (error) {
    res.status(400).json(error);
  }
}

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = req.body;
    const updatedHotel = await new Hotel.updateOne({ id }, hotel);
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { findAllHotels, createHotel, updateHotel }