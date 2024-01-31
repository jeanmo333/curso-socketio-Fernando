/** @format */

const Band = require("./band");

class BandList {
  constructor() {
    // this.bands = [
    //     new Band('Metallica'),
    //     new Band('Héroes del Silencio'),
    //     new Band('Bon Jovi'),
    //     new Band('Breaking Benjamin'),
    // ];
    this.bands = [
      new Band("Lun"),
      new Band("Mar"),
      new Band("Mie"),
      new Band("Jue"),
      new Band("Vie"),
      new Band("Sab"),
      new Band("Dom"),
      //   new Band("Lun1"),
      //   new Band("Mar2"),
      //   new Band("Mie3"),
      //   new Band("Jue4"),
      //   new Band("Vie5"),
      //   new Band("Sab6"),
      //   new Band("Dom7"),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }

      return band;
    });
  }

  changeName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }

      return band;
    });
  }
}

module.exports = BandList;
