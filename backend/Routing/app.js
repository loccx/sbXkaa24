const express = require("express");
const cors = require("cors");
const { searchEcosia } = require("./ecosia.controller");
const { getMessages, sendMessage } = require("./openai.controller");
const {
  addData, // adds a new user
  deleteAllInCollection, // deletes all users
  incrementSearchHistory, // updates first user
  getData, // gets first user
} = require("../Model/datainterface.model");
const morgan = require("morgan");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.post("/", (req, res) => {
  searchEcosia(req.body.query)
    .then(() => {
      res.status(200).send("Success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/tree", (req, res) => {
  addData()
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/tree", (req, res) => {
  getData()
    .then((entry) => {
      res.status(200).send(entry.data.num_searches.toString());
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/tree", (req, res) => {
  incrementSearchHistory()
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/tree", (req, res) => {
  deleteAllInCollection("users")
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/chat", (req, res) => {
  getMessages()
    .then((ans) => {
      res.status(200).send(ans);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/chat", (req, res) => {
  sendMessage(req.body.message)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      console.log(req.body.message);
      res.status(500).send(err);
    });
});

module.exports = {
  app,
};
