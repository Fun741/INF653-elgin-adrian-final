require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");

const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;

//conect db
connectDB();

//CORS
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Home page
app.get("^/$|home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

//API route
app.use("/states", require("./routes/state.js"));

//app.use(express.static(path.join(__dirname, "/public")));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

mongoose.connection.once("open", () => {
    console.log("Conected to MongoDB.");
    app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));
});

