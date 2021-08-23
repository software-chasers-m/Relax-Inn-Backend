const mongoose = require("mongoose");
const axios = require('axios');
const { jwt, getKey } = require('./Auth0.controller');
const UserData = require('../models/UserData.model');

const UserDataController = (req, res) => {
  UserData.find({}, (error, data) => {
    res.send(data);
  })
}

const AddUserData = (req, res) => {
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


module.exports = { UserDataController, AddUserData, DeleteUserData };
