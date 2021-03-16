const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const e = require("express");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const homeStartingContent =
  "***Hello  This is The Blog For Test to Integration Progressive web app in our project .";

const myProfile = {
  name: "Sila",
  lastname: "Kangluang",
  nickname: " Toey(เต้ย)",
  university: "Ramkhamhaeng",
  faculty: "Science",
  major: "Information Technology ",
  telnumber: "0865747xxx",
  email: "6005002255@rumail.ru.ac.th",
};

//home
app.get("/", function (req, response) {
  axios.get("https://covid19.th-stat.com/api/open/timeline").then((res) => {
    let timeline = res.data.Data;

    axios.get("https://covid19.th-stat.com/api/open/today").then((res) => {
      let covid = res.data;

      response.render("home", {
        startContent: homeStartingContent,
        timeline: timeline,
        data: covid,
      });
    });
  });
});

//about
app.get("/about", function (req, res) {
  res.render("about", {
    name: myProfile.name,
    lastname: myProfile.lastname,
    nickname: myProfile.nickname,
    university: myProfile.university,
    faculty: myProfile.faculty,
    major: myProfile.major,
  });
});

app.get("/app.js", function (req, res) {
  res.header("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/app.js");
});

//contact
app.get("/contact", function (req, res) {
  res.render("contact", { telno: myProfile.telnumber, email: myProfile.email });
});

//manifest
app.get("/manifest.json", function (req, res) {
  res.header("Content-Type", "text/cache-manifest");
  res.sendFile(__dirname + "/manifest.json");
});

// loader register serviceworker
app.get("/loader.js", function (req, res) {
  res.header("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/loader.js");
});
//serviceworker
app.get("/sw.js", function (req, res) {
  res.header("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/sw.js");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

/* app.get("/post/:title", function (req, res) {
  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
      res.render("post", { title: post.title, content: post.content });
    }
  });
}); */
