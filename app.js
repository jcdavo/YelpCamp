const passportLocalMongoose = require("passport-local-mongoose"),
  Campground = require("./models/campground"),
  localStrategy = require("passport-local"),
  Comment = require("./models/comment"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  express = require("express"),
  seedDB = require("./seeds"),
  app = express()

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Tell me if we connected correctly to the DB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
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

// Passport Configuration
app.use(require("express-session")({
  secret: "Why are Unicorns so lame",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// Very important, they are responsible  reading the data from session that's encoded
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// middleware for passing user name to all routes
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

seedDB();

// =========
// Routes
// =========

app.get("/", (req, res) => {
  res.render("landing");
});

// INDEX - Show all Campgrounds
app.get("/campgrounds", (req, res) => {
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
app.post("/campgrounds", isLoggedIn, (req, res) => {
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
app.get("/campgrounds/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - Shows more info about one Campground
app.get("/campgrounds/:id", (req, res) => {
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

// =================
// Comment Routes
// =================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
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

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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

// ===============
// Auth Routes
// ===============

// Register Form
app.get("/register", (req, res) => {
  res.render("register");
});

// Handle User SignUp
app.post("/register", (req, res) => {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/campgrounds");
      });
    };
  });
});

// ===============
// Login Routes
// ===============

// Login Form
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  function () {});

// ===============
// Logout Routes
// ===============

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect("/login");
};

// Server Settings
app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("On-Line at 3000");
});