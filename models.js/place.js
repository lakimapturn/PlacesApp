export default class Place {
  constructor(id, title, imageUri, address, latitude, longitude) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.coords = { latitude: latitude, longitude: longitude };
  }
}
