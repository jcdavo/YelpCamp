const Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  express = require("express"),
  router = express.Router({
    mergeParams: true
  });

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
  console.log(Campground.findById(req.params.id));
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

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
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

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect("/login");
};

module.exports = router;