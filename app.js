"use strict";

const express = require('express');
const mongoose = require('mongoose');
const hotelRoutes = require('./routes/hotelRoutes');
const authRoutes = require('./routes/authRoutes');
require("dotenv").config();

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = process.env.DATABASE_URI;
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => app.listen(port))
  .catch(err => console.log(err));

// middleware & static files
app.use(express.urlencoded({ extended: true }));

// routes

app.get("/", (req, res) => {
  res.status(200).json({
    applicationName: "Online Room Booking Server",
    status: "Up",
    date: new Date(),
  });
});
app.get('/', (req, res) => {
  res.redirect('/hotels');
});

// hotel routes
app.use('/hotels', hotelRoutes);
app.use('/auth', authRoutes);