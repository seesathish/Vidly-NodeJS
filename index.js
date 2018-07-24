const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const home = require("./routes/home");

if (!config.get("jwtPrivatKey")) {
  console.error("FATAL ERROR: jwtPrivateKey not defined...");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

// setting enviromental variable - $env:PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
