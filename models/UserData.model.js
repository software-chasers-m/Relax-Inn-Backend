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

// const SeedUserData = () => {
//   const newData = new UserData({
//     hotelName: 'landmark',
//     roomName: 'delux',
//     checkIn: '30/7',
//     checkOut: '10/8',
//     totalPrice: '500',
//     messageChildren: '2',
//     messageTotal: '20',
//     img: 'ff',
//     email: 'Moayad.alhaj21@gmail.com'
//   })
//   newData.save();
// }

module.exports = UserData;
