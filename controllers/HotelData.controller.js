const HotelModel = require('../models/Hotel.model');
const RoomModel = require('../models/Room.model');
const rapidToken = process.env.RAPIDAPI_KEY;
const rapidHost = process.env.RAPIDAPI_HOST;
const axios = require('axios');
const { jwt, getKey } = require('./Auth0.controller');

const HotelController = (req, res) => {
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
    let hotelArray = response.data.data.body.searchResults.results.map(element => new HotelModel(element));
    res.send(hotelArray);
  }).catch(error => {
    console.error(error);
  });
}

const RoomController = (req, res) => {
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

    let options2 = {
      method: 'GET',
      url: `https://hotels-com-free.p.rapidapi.com/nice/image-catalog/v2/hotels/${locationId}`,
      headers: {
        'x-rapidapi-host': rapidHost,
        'x-rapidapi-key': rapidToken
      }
    };
    axios.request(options2).then(response => {
      newArray.push({ roomsImages: response.data.roomImages.map(element => element.images.map(el => el.baseUrl)) });
      res.send(newArray);
    });
  }).catch(error => {
    console.error(error);
  });
}

module.exports = { HotelController, RoomController };