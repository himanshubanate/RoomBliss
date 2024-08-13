const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/Booking");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGO_URL;
app.use((req, res, next) => {
  console.log(req.params);
  next();
});
/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

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
