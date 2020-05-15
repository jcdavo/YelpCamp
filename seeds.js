const mongoose = require("mongoose"),
  Campground = require("./models/campground");

Campground.remove({}, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Removed Campgrounds")
  }
});