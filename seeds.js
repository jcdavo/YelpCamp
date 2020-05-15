const mongoose = require("mongoose"),
  Campground = require("./models/campground");

// .removed() is deprecated, .deleteMany() to be used
const seedDB = () => {
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds")
    }
  });
};

module.exports = seedDB;