const mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment")

const data = [{
    name: "Elbow Falls",
    image: "https://live.staticflickr.com/2646/3851438221_f98f6e435d_b.jpg",
    description: "blah, blah, blah"
  },
  {
    name: "South Bragg Creek",
    image: "https://live.staticflickr.com/7390/9867372466_843f13b1c9_b.jpg",
    description: "blah, blah, blah"
  },
  {
    name: "Candle Lake",
    image: "https://live.staticflickr.com/8599/16710089445_7b8bcd92ed_b.jpg",
    description: "blah, blah, blah"
  },
  {
    name: "Lake wisp",
    image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg",
    description: "blah, blah, blah"
  },
];

const seedDB = () => {
  // remove all campgrounds -- .removed() is deprecated, .deleteMany() to be used
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds")
      // Add some campgrounds
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Campground added!");
            // Create Comment
            Comment.create({
              text: "This place is amazing!, to bad there's  no internet",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comment.push(comment);
                campground.save();
                console.log("Comment created");
              };
            });
          };
        });
      });
    };
  });
};

module.exports = seedDB;