class RoomModel {

  constructor(elements) {
    this.id = elements.id;
    this.overview = elements.overviewSections.content;
    this.roomTypeNames = elements.roomTypes;
    this.rate = elements.guestReviews.brands.rating;
    // this.img = elements.optimizedThumbUrls.srpDesktop;
  }
}

module.exports = RoomModel;