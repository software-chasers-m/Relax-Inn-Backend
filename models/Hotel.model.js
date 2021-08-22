class HotelModel {

  constructor(elements) {
    this.id = elements.id;
    this.name = elements.name;
    this.starRating = elements.starRating;
    this.streetAddress = elements.streetAddress;
    this.address = `${elements.address.locality}, ${elements.address.countryName}`;
    this.price = elements.ratePlan;
    this.img = elements.optimizedThumbUrls.srpDesktop;
  }
}

module.exports = HotelModel;
