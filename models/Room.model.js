class RoomModel {

  constructor(elements) {
    this.roomName = elements.name;
    this.images = elements.images;
    this.maxOccupancy = elements.maxOccupancy;
  }
}

module.exports = RoomModel;
