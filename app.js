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

app.get("/campgrounds", (req, res) => {
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
  ];
  res.render("campGrounds", {
    sites: campGrounds,
  });
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  console.log(`Name: ${name}, Image: ${image}`);
  console.log(req.body)
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs")
})


app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("On-Line at 3000")
});