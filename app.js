const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Tell me if we connected correctly to the DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
// Tell Express to use body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Campground.create({
//   name: "Elbow Falls",
//   image: "https://live.staticflickr.com/2646/3851438221_f98f6e435d_b.jpg",
//   description: "Beautiful Elbow Falls, amazing star nights and great waterfall, no services"
// }, (err, campground) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success! New Campground added!");
//     console.log(campground);
//   }
// });

// var campGrounds = [{
//     name: "Elbow Falls",
//     image: "https://live.staticflickr.com/2646/3851438221_f98f6e435d_b.jpg"
//   },
//   {
//     name: "South Bragg Creek",
//     image: "https://live.staticflickr.com/7390/9867372466_843f13b1c9_b.jpg"
//   },
//   {
//     name: "Candle Lake",
//     image: "https://live.staticflickr.com/8599/16710089445_7b8bcd92ed_b.jpg"
//   },
//   {
//     name: "Lake wisp",
//     image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"
//   },
// ];


app.get("/", (req, res) => {
  res.render(`landing`)
});

// INDEX - Show all Campgrounds
app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        sites: campgrounds,
      });
    }
  })
});

// CREATE - Add new Campground to DB
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description
  };
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
      console.log("Success! New Campground added!");
      console.log(campground);
    }
  });
});

// NEW - Display form for new Campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs")
})

// SHOW - Shows more info about one Campground
app.get("/campground/:id", (req, res) => {
  // find campground with provided id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {
        campground: foundCampground
      });
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("On-Line at 3000")
});