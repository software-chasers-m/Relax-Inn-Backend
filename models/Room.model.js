class RoomModel {

  constructor(elements) {
    this.id = elements.id;
    this.overview = elements.overviewSections;
    this.roomTypeNames = elements.roomTypes;
    // this.img = elements.optimizedThumbUrls.srpDesktop;
  }
}

module.exports = RoomModel;