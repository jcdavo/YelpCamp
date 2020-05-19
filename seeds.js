const mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment")

const data = [{
    name: "Elbow Falls",
    image: "https://live.staticflickr.com/2646/3851438221_f98f6e435d_b.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Lobortis elementum nibh tellus molestie nunc non blandit. Leo vel orci porta non pulvinar neque laoreet. Aliquam faucibus purus in massa tempor nec. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Vitae tempus quam pellentesque nec nam. Et ultrices neque ornare aenean euismod elementum nisi quis. Placerat duis ultricies lacus sed. Porttitor massa id neque aliquam vestibulum morbi. Volutpat est velit egestas dui id ornare arcu. Eget nulla facilisi etiam dignissim diam. Nullam non nisi est sit amet facilisis."
  },
  {
    name: "South Bragg Creek",
    image: "https://live.staticflickr.com/7390/9867372466_843f13b1c9_b.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Lobortis elementum nibh tellus molestie nunc non blandit. Leo vel orci porta non pulvinar neque laoreet. Aliquam faucibus purus in massa tempor nec. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Vitae tempus quam pellentesque nec nam. Et ultrices neque ornare aenean euismod elementum nisi quis. Placerat duis ultricies lacus sed. Porttitor massa id neque aliquam vestibulum morbi. Volutpat est velit egestas dui id ornare arcu. Eget nulla facilisi etiam dignissim diam. Nullam non nisi est sit amet facilisis."
  },
  {
    name: "Candle Lake",
    image: "https://live.staticflickr.com/8599/16710089445_7b8bcd92ed_b.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Lobortis elementum nibh tellus molestie nunc non blandit. Leo vel orci porta non pulvinar neque laoreet. Aliquam faucibus purus in massa tempor nec. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Vitae tempus quam pellentesque nec nam. Et ultrices neque ornare aenean euismod elementum nisi quis. Placerat duis ultricies lacus sed. Porttitor massa id neque aliquam vestibulum morbi. Volutpat est velit egestas dui id ornare arcu. Eget nulla facilisi etiam dignissim diam. Nullam non nisi est sit amet facilisis."
  },
  {
    name: "Lake wisp",
    image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Lobortis elementum nibh tellus molestie nunc non blandit. Leo vel orci porta non pulvinar neque laoreet. Aliquam faucibus purus in massa tempor nec. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Vitae tempus quam pellentesque nec nam. Et ultrices neque ornare aenean euismod elementum nisi quis. Placerat duis ultricies lacus sed. Porttitor massa id neque aliquam vestibulum morbi. Volutpat est velit egestas dui id ornare arcu. Eget nulla facilisi etiam dignissim diam. Nullam non nisi est sit amet facilisis."
  },
];

const seedDB = () => {
  // remove all campgrounds -- .removed() is deprecated, .deleteMany() to be used
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds")
      Comment.deleteMany({}, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Removed Comments");
        };
      });
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