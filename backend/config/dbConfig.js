const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://harrisaamir:Q1WxT8lb1Tgg0An5@cluster0.fc1xywc.mongodb.net/");

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo Db Connection Successfull");
});

db.on("error", () => {
  console.log("Mongo Db Connection Failed");
});