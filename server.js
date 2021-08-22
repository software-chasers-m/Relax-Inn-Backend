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
const { HotelController, RoomController, StoredData } = require('./controllers/HotelData.controller');

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/hotelData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Server is working');
})

app.get('/hotelName', HotelController);

app.get('/rooms', RoomController);

app.get('/storeData', StoredData)

app.listen(PORT, () => console.log(`listening on ${PORT}`));
