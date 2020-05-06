const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
// Tell Express to use body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render(`landing`)
});

var campGrounds = [{
    name: "Elbow Falls",
    image: "https://live.staticflickr.com/2646/3851438221_f98f6e435d_b.jpg"
  },
  {
    name: "South Bragg Creek",
    image: "https://live.staticflickr.com/7390/9867372466_843f13b1c9_b.jpg"
  },
  {
    name: "Candle Lake",
    image: "https://live.staticflickr.com/8599/16710089445_7b8bcd92ed_b.jpg"
  },
  {
    name: "Lake wisp",
    image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg"
  },
];

app.get("/campgrounds", (req, res) => {
  res.render("campGrounds", {
    sites: campGrounds,
  });
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  campGrounds.push(newCampground);
  res.redirect("/campgrounds");
  console.log(`Name: ${name}, Image: ${image}`);
  console.log(newCampground)
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs")
})


app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("On-Line at 3000")
});