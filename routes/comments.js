const Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  express = require("express"),
  router = express.Router({
    mergeParams: true
  });

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
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
          // add username and id
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          campground.comment.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        };
      });
    };
  });
});

// Edit Comments
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    };
  });
});

// Update Comments
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updateComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    };
  });
});

// Destroy Comment
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (err) {
      console.log('back');
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
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

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        res.redirect(`back`);
      } else {
        if (comment.author.id.equals(req.user._id)) {
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