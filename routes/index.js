const express = require("express"),
  User = require("../models/user"),
  passport = require("passport"),
  router = express.Router();

// Root Route
router.get("/", (req, res) => {
  res.render("landing");
});

// Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle User SignUp
router.post("/register", (req, res) => {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", `Welcome to YelpCamp ${user.username}`);
        res.redirect("/campgrounds");
      });
    };
  });
});

// Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully Signed Out!");
  res.redirect("/campgrounds");
});

module.exports = router;