const mongoose = require("mongoose");
const HotelModel = require('../models/Hotel.model');
const RoomModel = require('../models/Room.model');
const rapidToken = process.env.RAPIDAPI_KEY;
const rapidHost = process.env.RAPIDAPI_HOST;
const rapidHost2 = process.env.RAPIDAPI_HOST2;
const axios = require('axios');
const { jwt, getKey } = require('./Auth0.controller');
const HotelsData = require('../models/HotelStore.model');


const HotelController = (req, res) => {
  let options = {
    method: 'GET',
    url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
    params: {
      lat: req.query.lat,
      lon: req.query.lon,
      checkIn: req.query.checkIn,
      checkOut: req.query.checkOut,
      rooms: '1',
      locale: 'en_US',
      currency: 'USD',
      pageNumber: '1',
      sortOrder: req.query.sortOrder
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
      checkout_date: req.query.checkOut,
      hotel_id: req.query.id,
      currency: 'USD',
      locale: 'en_US',
      checkin_date: req.query.checkIn,
      adults_number: '1',
      children_ages: '4,0'
    },
    headers: {
      'x-rapidapi-host': rapidHost2,
      'x-rapidapi-key': rapidToken
    }
  }
  axios.request(options).then(response => {
    let roomsArray = response.data.roomsAndRates.rooms.map(element => new RoomModel(element))
    res.send(roomsArray);
  }).catch(function (error) {
    console.error(error);
  });
}

const StoredData = (req, res) => {
  // let options = {
  //   method: 'GET',
  //   url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
  //   params: {
  //     lat: 29.526702,
  //     lon: 35.007822,
  //     checkIn: '2021-01-27',
  //     checkOut: '2021-01-28',
  //     rooms: '1',
  //     locale: 'en_US',
  //     currency: 'USD',
  //     pageNumber: '1',
  //     sortOrder: 'STAR_RATING_HIGHEST_FIRST'
  //   },
  //   headers: {
  //     'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com',
  //     'x-rapidapi-key': '76f2cd8516msh9aa0fdee3e33b73p1d7aafjsn322f4e3e0674'
  //   }
  // };
  // axios.request(options).then(response => {
  //   response.data.data.body.searchResults.results.map(element => {
  //     const newHotel = new HotelsData({
  //       hotelName: element.name,
  //       address: `${element.address.locality}, ${element.address.countryName}`,
  //       starRating: element.starRating,
  //       img: element.optimizedThumbUrls.srpDesktop,
  //     });
  //     newHotel.save();
  HotelsData.find({}, (err, hotels) => {
    res.send(hotels);
    //   });
    // })
    //   })
  })
}

module.exports = { HotelController, RoomController, StoredData };
