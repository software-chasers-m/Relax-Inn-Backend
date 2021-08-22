const mongoose = require('mongoose');

const HotelDataSchema = new mongoose.Schema({
  hotelName: String,
  address: String,
  starRating: Number,
  img: String,
});

const HotelsData = mongoose.model('Hotels', HotelDataSchema);

// const SeedHotels = () => {
//   const jordansHotels = new HotelsData({
//     hotelName: 'Landmark Amman Hotel & Conference Center',
//     address: 'Amman, Jordan',
//     starRating: 5,
//     img: 'https://thumbnails.trvl-media.com/kegYNwagRFfpYMk9MTHwNOggLso=/250x140/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/90000/83600/83547/251eee9d_z.jpg',
//   });
//   jordansHotels.save();
// }

module.exports = HotelsData;
