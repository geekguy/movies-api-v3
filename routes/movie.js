const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Movie = require("../models/movie");

const logger = (req, res, next) => {
  console.log(`${req.method} received on URL ${req.url}`);
  next();
};

const validateJWT = (req, res, next) => {
  const headers = req.headers;
  const token = headers.authorization;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log({ decodedToken });
  if (decodedToken.email) {
    req.user = decodedToken;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.use(logger);
router.use(validateJWT);

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
  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden");
  }
  const dbMovie = await Movie.create(req.body);
  res.send(dbMovie);
});

module.exports = router;
