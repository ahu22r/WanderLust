const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require('../controllers/listings.js');

const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage })

router.route('/')
    // Index Routes
    .get(wrapAsync(listingController.index))
    // Create route
    .post(isLoggedIn,upload.single('listing[image]'), wrapAsync(listingController.createListing));

// New & Create routes
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // Show Routes
    .get(wrapAsync(listingController.showListing))
    // Update Routes
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    // Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

    
// Edit Route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;