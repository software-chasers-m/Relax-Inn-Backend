const HotelModel = require('../models/Hotel.model');
const RoomModel = require('../models/Room.model');
const rapidToken = process.env.RAPIDAPI_KEY;
const rapidHost = process.env.RAPIDAPI_HOST;
const rapidHost2 = process.env.RAPIDAPI_HOST2;
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
  let options = {
    method: 'GET',
    url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details',
    params: {
      checkout_date: '2022-03-27',
      hotel_id: '179663',
      currency: 'USD',
      locale: 'en_US',
      checkin_date: '2022-03-26',
      adults_number: '1',
      children_ages: '4,0'
    },
    headers: {
      'x-rapidapi-host': rapidHost2,
      'x-rapidapi-key': rapidToken
    }
  };

  axios.request(options).then(response => {
    let roomsArray = response.data.roomsAndRates.rooms.map(element => new RoomModel(element))
    res.send(roomsArray);
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = { HotelController, RoomController };
