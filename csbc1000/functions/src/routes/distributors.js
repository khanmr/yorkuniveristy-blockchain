const express = require("express");
const {
  addDistributor,
  getAllDistributors,
  getDistributorByID,
  updateDistributorByID,
  deleteDistributorByID,
} = require("../controller/distributor");

// create route handlers
// router will contain the Router instance.
const router = express.Router();

// HTTP POST /distributors delegates to addDistributor()
router.post("/", addDistributor);

// HTTP GET /distributors delegates to getAllDistributors()
router.get("/", getAllDistributors);

// HTTP GET /distributors/:id delegates to getDistributorByID()
router.get("/:id", getDistributorByID);

// HTTP PUT /distributors/:id delegates to updateDistributorByID()
router.put("/:id", updateDistributorByID);

// HTTP DELETE /distributors/:id delegates to deleteDistributorByID()
router.delete("/:id", deleteDistributorByID);

module.exports = router;
