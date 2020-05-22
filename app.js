const passportLocalMongoose = require("passport-local-mongoose"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  localStrategy = require("passport-local"),
  Comment = require("./models/comment"),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  port = process.env.PORT || 3000,
  User = require("./models/user"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  express = require("express"),
  seedDB = require("./seeds"),
  app = express();

// Require Routes
const campgroundsRoutes = require("./routes/campgrounds"),
  commentsRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

// DB connection
const yelpCamp = "mongodb://localhost:27017/yelp_camp",
  db = mongoose.connection;
mongoose.connect(yelpCamp, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  // useCreateIndex: true
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Connected to db: ${yelpCamp}`);
});

// App Settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Seed Database
// seedDB();

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

// Server Settings
const server = app.listen(port, process.env.IP, () => {
  var host = server.address().address,
    port = server.address().port;
  console.log(`YelpCamp connected @ ${port + host}`);
});