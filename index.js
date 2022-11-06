const express = require("express");
const { connectToMongoDB } = require("./db");
const userRoute = require('./routes/user')
const blogRoute = require('./routes/authors')
const articleRoute = require("./routes/article");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./authentication/auth") // Signup and login authentication middleware



require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

// connect to Mongodb server
connectToMongoDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRoute);
app.use("/getarticles", articleRoute);
app.use("/authors",  passport.authenticate('jwt', { session: false }), blogRoute);


app.get("/", (req, res) => {
  res.send("Welcome home");
});

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});

module.exports = app;