const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let tabs = [];

client.connect(async (err) => {
  if (err) console.log(err);
  else {
    const collection = client.db("video-game-tabs").collection("tabs");
    await collection.find({}).forEach((tab) => tabs.push(tab));
  }
});
client.close();

app.get("/", (req, res) => {
  res.json("working!");
});

app.get("/tabs", (req, res) => {
  res.json(tabs);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
