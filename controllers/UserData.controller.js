const mongoose = require("mongoose");
const axios = require('axios');
const { jwt, getKey } = require('./Auth0.controller');
const UserData = require('../models/UserData.model');

const UserDataController = (req, res) => {
  // let email = req.query.email;
  // console.log(email);
  // UserData.find({ email: email }, (error, data) => {
  //   if (error) {
  //     res.send(error.message);
  //   } else if (data === undefined) {
  //     res.send('Data is not found');
  //   } else {
  //     res.send(data);
  //   }
  // });
  UserData.find({}, (err, data) => {
    res.send(data);
  })
}

const AddUserData = (req, res) => {
  // const token = req.headers.authorization.split(' ')[1];
  // jwt.verify(token, getKey, {}, (err, user) => {
  //   if (err) {
  //     res.send('invalid token');
  //   }
  const newData = new UserData({
    hotelName: req.body.hotelName,
    roomName: req.body.roomName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    totalPrice: req.body.totalPrice,
    messageChildren: req.body.messageChildren,
    messageTotal: req.body.messageTotal,
    img: req.body.img,
    email: req.body.email
  });
  newData.save();
  res.send(newData);
})
}

const DeleteUserData = (req, res) => {
  let dataId = req.params.id;
  UserData.findByIdAndDelete({ _id: dataId }, (err, data1) => {
    if (err) {
      res.send("delete faild")
    }
    UserData.find({}, (err, data) => {
      res.send(data);
    })
  })
}

const UpdateUserData = (req, res) => {
  let roomId = req.params.id;
  UserData.findOne({ _id: roomId }, (err, data) => {
    if (err) {
      res.send("Update faild")
    }
    data.checkIn = req.body.checkIn;
    data.checkOut = req.body.checkOut;
    data.totalPrice = req.body.totalPrice;
    data.save();
    res.send(data);
  })
}

module.exports = { UserDataController, AddUserData, DeleteUserData, UpdateUserData };
