const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  {
    id: 1,
    name: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    id: 2,
    name: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  },
  {
    id: 3,
    name: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  },
  {
    id: 4,
    name: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
  {
    id: 5,
    name: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
  },
];

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((m) => m.id === parseInt(id));
  res.send(movie);
});

app.post("/api/movies", (req, res) => {
  const movie = req.body;
  movie.id = movies.length + 1;
  movies.push(movie);
  res.send(movie);
});
