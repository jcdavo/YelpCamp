const Campground = require("../models/campground"),
  express = require("express"),
  router = express.Router();

// INDEX - Show all Campgrounds
router.get("/", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        sites: campgrounds
      });
    };
  });
});

// CREATE - Add new Campground to DB
router.post("/", isLoggedIn, (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - Shows more info about one Campground
router.get("/:id", (req, res) => {
  // find campground with provided id
  Campground.findById(req.params.id)
    .populate("comment")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        // render show template with that campground
        res.render("campgrounds/show", {
          campground: foundCampground
        });
      };
    });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect("/login");
};

module.exports = router;