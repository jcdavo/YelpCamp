const Campground = require("../models/campground"),
  Comment = require("../models/comment");

// all middleware goes here
const middlewareObj = {};

//  Campground Ownership
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err || !campground) {
        req.flash("error", "Campground not found");
        res.redirect(`/campgrounds`);
      } else {
        if (campground.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash("error", "You don't have the authority to pull that off!");
          res.redirect("/campgrounds");
        };
      };
    });
  } else {
    req.flash("error", "You need to be logged in first!");
    res.redirect(`/campgrounds/${req.params.id}`);
  };
};

// Comment ownership
middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err || !comment) {
        req.flash("error", "Comment not found");
        res.redirect(`/campgrounds/${req.params.id}`);
      } else {
        if (comment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash("error", "You don't have the authority to pull that off!");
          res.redirect(`/campgrounds/${req.params.id}`);
        };
      };
    });
  } else {
    req.flash("error", "You need to be logged in first!");
    res.redirect("back");
  };
};

// Is user logged in
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

module.exports = middlewareObj;