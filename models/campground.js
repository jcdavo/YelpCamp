const mongoose = require("mongoose");

// Schema for Mongo
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
module.exports = mongoose.model("Campground", campgroundSchema);