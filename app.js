const Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  seedDB = require("./seeds"),
  app = express()

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
app.use(express.static(__dirname + "/public"));
// Tell Express to use body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

seedDB();

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
      res.render("campgrounds/index", {
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
  res.render("campgrounds/new")
})

// SHOW - Shows more info about one Campground
app.get("/campgrounds/:id", (req, res) => {
  // find campground with provided id
  Campground.findById(req.params.id).populate("comment").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
});

// ============ Comment Routes ==========

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      });
    };
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comment.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        };
      });
    };
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("On-Line at 3000");
});