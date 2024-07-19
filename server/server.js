const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//app
const app = express();

//db
const dbUrl =
  process.env.DATABASE ||
  "mongodb+srv://20218032gdscmnnit24:IIZfzBYPPZOIKX13@cluster0.d9gfan8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
readdirSync('./routes').map((r) =>
    app.use("/api", require('./routes/' + r))
);


//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
