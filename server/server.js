const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const routes = require("./api.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/api", routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/CS299", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
