//This file conatins middleware functions responsible for handling different routes
const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

//first argument is the filter path
//:pid is used to dynamically access that path
//This method gets a specific place
router.get("/:pid", placesControllers.getPlacebyId);

//Route to get place by user id
router.get("/user/:uid", placesControllers.getPlacesbyUserId);

//POST request to create a route
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }, check("address").not().isEmpty()),
  ],
  placesControllers.createPlace
);
//Here we are adding data validation inside our middleware function which is excuted before reaching controller logic

//PATCH request to update a place
router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }, check("address").not().isEmpty()),
  ],
  placesControllers.updatePlace
);

//DELETE request to delete a place
router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
