const express = require("express");
const cors = require("cors");
const { searchEcosia } = require("./ecosia.search");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.post("/:query", (req, res) => {
  searchEcosia(req.params.query)
    .then(() => {
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/treenumber", (req, res) => {
  res.send("123456789");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
