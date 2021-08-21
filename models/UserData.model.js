const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  hotelName: String,
  adults: String,
  roomName: String,
  numberOfRooms: Number,
  checkInDate: String,
  checkOutDate: String,
  totalPrice: Number,
  img: String,
  email: String,
});

const UserData = mongoose.model('Books', UserDataSchema);

module.exports = UserData;
