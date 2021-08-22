'use strict';
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
const router = express.Router();
const mongoose = require("mongoose");
app.use(express.json());
const PORT = process.env.PORT || 8000;
const { HotelController, RoomController } = require('./controllers/HotelData.controller');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is working');
})

app.get('/hotelName', HotelController);

app.get('/rooms', RoomController);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
