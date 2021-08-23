const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  hotelName: String,
  roomName: String,
  checkIn: String,
  checkOut: String,
  totalPrice: String,
  messageChildren: String,
  messageTotal: String,
  img: String,
  email: String,
});

const UserData = mongoose.model('UsersData', UserDataSchema);

module.exports = UserData;
