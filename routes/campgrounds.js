const Campground = require("../models/campground"),
  middleware = require('../middleware'),
  express = require("express"),
  router = express.Router();

// INDEX - Show all Campgrounds
router.get("/", (req, res) => {
  // eval(require("locus"));
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    console.log(regex);
    Campground.find({
      $or: [{
        name: regex
      }, {
        description: regex
      }, {
        "author.username": regex
      }]
    }, (err, campgrounds) => {
      if (err) {
        console.log(err);
      } else {
        if (campgrounds.length < 1) {
          req.flash("error", `Campground containing "${req.query.search}" not found, please try again.`);
          res.redirect("/campgrounds");
        } else {
          res.render("campgrounds/index", {
            sites: campgrounds
          });
        };
      };
    });
  } else {
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
  };
});

// CREATE - Add new Campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  var name = req.body.name;
  var price = req.body.price;
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
    price: price,
    author: author
  };
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      req.flash("error", err.message);
      console.log(err);
    } else {
      req.flash("success", `New ${campground.name} created!`);
      res.redirect("/campgrounds");
    }
  });
});

// NEW - Display form for new Campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - Shows more info about one Campground
router.get("/:id", (req, res) => {
  // find campground with provided id
  Campground.findById(req.params.id)
    .populate("comment")
    .exec((err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash("error", "Campground not found");
        res.redirect("/campgrounds");
      } else {
        // render show template with that campground
        res.render("campgrounds/show", {
          campground: foundCampground
        });
      };
    });
});

// Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    res.render("campgrounds/edit", {
      campground: campground,
    });
  });
});

// Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updateCampground) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground updated!");
      res.redirect(`/campgrounds/${req.params.id}`);
    };
  });
});

// Destroy Campground
// async with a hook on the model to delete associated comments
router.delete("/:id", middleware.checkCampgroundOwnership, async (req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    req.flash("error", `${foundCampground.name} is deleted!`);
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;