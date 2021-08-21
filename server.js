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

const rapidToken = process.env.RAPIDAPI_KEY;
const rapidHost = process.env.RAPIDAPI_HOST;
const HotelModel = require('./models/Hotel.model');
const RoomModel = require('./models/Room.model');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is working');
})

app.get('/hotelName', (req, res) => {
  let options = {
    method: 'GET',
    url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
    params: {
      lat: 31.9515694,
      lon: 35.9239625,
      checkIn: '2021-01-27',
      checkOut: '2021-01-28',
      rooms: '1',
      locale: 'en_US',
      currency: 'USD',
      pageNumber: '1',
      sortOrder: 'NO_SORT'
    },
    headers: {
      'x-rapidapi-host': rapidHost,
      'x-rapidapi-key': rapidToken
    }
  };
  axios.request(options).then(response => {
    let hotelArray = response.data.data.body.searchResults.results.map(element => new HotelModel(element))
    res.send(hotelArray);
  }).catch(error => {
    console.error(error);
  });
})

app.get('/rooms', (req, res) => {
  let locationId = req.query.id;
  let options = {
    method: 'GET',
    url: `https://hotels-com-free.p.rapidapi.com/pde/property-details/v1/hotels.com/${locationId}`,
    params: {
      rooms: '1',
      checkIn: '2021-01-27',
      checkOut: '2021-01-28',
      locale: 'en_US',
      currency: 'USD',
      include: 'neighborhood'
    },
    headers: {
      'x-rapidapi-host': rapidHost,
      'x-rapidapi-key': rapidToken
    }
  };
  axios.request(options).then(response => {
    let newArray = [];
    newArray.push(response.data.data.body.overview);
    newArray.push({ roomTypes: response.data.data.body.propertyDescription.roomTypeNames });
    // let roomsArray = new RoomModel(newArray);
    res.send(newArray);
  }).catch(error => {
    console.error(error);
  });
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
