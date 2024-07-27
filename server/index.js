const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URL;

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);

/* MONGOOSE SETUP */
mongoose
  .connect(URL, {
    dbName: "roombliss",
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on", PORT);
    });
  })
  .catch((err) => {
    console.log("error in connection", err);
  });
