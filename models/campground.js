const mongoose = require("mongoose"),
  Comment = require('./comment');

// Schema for Mongo
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Middleware Hook to delete comments associated with campground
campgroundSchema.pre('remove', async function () {
  await Comment.deleteMany({
    _id: {
      $in: this.comment
    }
  });
});

module.exports = mongoose.model("Campground", campgroundSchema);