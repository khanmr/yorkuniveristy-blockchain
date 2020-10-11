const express = require("express");
const {
  addLogistics,
  getAllLogistics,
  getAllAvailableLogistics,
  getLogisticsByID,
  updateLogisticsByID,
  deleteLogisticsByID,
} = require("../controller/logistics");

// create route handlers
// router will contain the Router instance.
const router = express.Router();

// HTTP POST /logistics delegates to addLogistics()
router.post("/", addLogistics);

// HTTP GET /logistics delegates to getAllLogistics()
router.get("/", getAllLogistics);

// HTTP GET /logistics/available delegates to getAllAvailableLogistics()
router.get("/available", getAllAvailableLogistics);

// HTTP GET /logistics/:id delegates to getLogisticsByID()
router.get("/:id", getLogisticsByID);

// HTTP PUT /logistics/:id delegates to updateLogisticsByID()
router.put("/:id", updateLogisticsByID);

// HTTP DELETE /logistics/:id delegates to deleteLogisticsByID()
router.delete("/:id", deleteLogisticsByID);

module.exports = router;
