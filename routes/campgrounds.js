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
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
  };
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
      console.log("Success! New Campground added!");
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

// Edit Campground
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    res.render("campgrounds/edit", {
      campground: campground,
    });
  });
});

// Update Campground
router.put("/:id", checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updateCampground) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    };
  });
});

// Destroy Campground
// async with a hook on the model to delete associated comments
router.delete("/:id", checkCampgroundOwnership, async (req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("/campgrounds");
  }
});


// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect("/login");
};

function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        res.redirect(`back`);
      } else {
        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        };
      };
    });
  } else {
    res.redirect("back");
  };
};

module.exports = router;