require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;
console.log({ PORT });
const movieRouter = require("./routes/movie");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/movies", movieRouter);
