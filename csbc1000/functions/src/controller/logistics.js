const { v4: uuidv4 } = require("uuid");
const Web3 = require("web3");
const {
  create: createLogisticsModel,
  getAll: getAllLogisticsModel,
  getAllAvailable: getAllAvailableLogisticsModel,
  getByID: getLogisticsModelByID,
  updateByID: updateLogisticsModelByID,
  deleteByID: deleteLogisticsModelByID,
} = require("../model/logistics");

// initialize web3
const web3 = new Web3("http://localhost:7545");

const addLogistics = async (req, res) => {
  try {
    // create a new object
    let logistics = req.body;
    logistics["id"] = uuidv4();

    await createLogisticsModel(logistics);

    res.status(201).json({
      id: logistics.id,
      message: "successfully added logistics company",
    });
  } catch (error) {
    // handle errors
    res.status(400).json({
      error: error,
    });
  }
};

const getAllLogistics = async (req, res) => {
  try {
    const logistics = await getAllLogisticsModel();

    res.status(200).send(logistics);
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const getAllAvailableLogistics = async (req, res) => {
  try {
    const logistics = await getAllAvailableLogisticsModel();

    res.status(200).send(logistics);
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const getLogisticsByID = async (req, res) => {
  try {
    const logisticsID = req.params.id;
    const logistics = await getLogisticsModelByID(logisticsID);

    if (!logistics.exists) {
      res.status(404).send(`error: user ${logisticsID} does not exist`);
    }

    res.status(200).send(logistics.data());
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const updateLogisticsByID = async (req, res) => {
  try {
    const logisticsID = req.params.id;
    await updateLogisticsModelByID(logisticsID, req.body);

    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const deleteLogisticsByID = async (req, res) => {
  try {
    const logisticsID = req.params.id;
    await deleteLogisticsModelByID(logisticsID);

    // send response
    res.status(204).json({
      message: "user deleted",
    });
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  addLogistics,
  getAllLogistics,
  getAllAvailableLogistics,
  getLogisticsByID,
  updateLogisticsByID,
  deleteLogisticsByID,
};
