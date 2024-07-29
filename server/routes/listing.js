const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;
    const listingPhotos = req.files;
    console.log("listingPhotos", listingPhotos);
    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }
    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
      listingPhotoPaths,
    });

    await newListing.save();
    res.status(200).json({
      message: "Listing created SuccessFuly!",
      listing: newListing,
    });
  } catch (err) {
    res
      .status(409)
      .json({ message: "Failed to create Listing", error: err.message });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const qCategory = req.params.category;

  try {
    const list = Listing?.find({ category: qCategory });
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Failed to fetch properties", error: err.message });
    console.log(err);
  }
});

module.exports = router;

// *****listing details****

router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});
