const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");

const logger = (req, res, next) => {
  console.log(`${req.method} received on URL ${req.url}`);
  next();
};

router.use(logger);

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const dbMovie = await Movie.create(req.body);
  res.send(dbMovie);
});

module.exports = router;
