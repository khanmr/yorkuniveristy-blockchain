const { v4: uuidv4 } = require("uuid");
const {
  create: createDistributorModel,
  getAll: getAllDistributorModel,
  getByID: getDistributorModelByID,
  updateByID: updateDistributorModelByID,
  deleteByID: deleteDistributorModelByID,
} = require("../model/distributor");

const addDistributor = async (req, res) => {
  try {
    // create a new object
    let distributor = req.body;
    distributor["id"] = uuidv4();

    await createDistributorModel(distributor);

    res.status(201).json({
      id: distributor.id,
      message: "successfully added distributor",
    });
  } catch (error) {
    // handle errors
    res.status(400).json({
      error: error,
    });
  }
};

const getAllDistributors = async (req, res) => {
  try {
    const distributors = await getAllDistributorModel();

    res.status(200).send(distributors);
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const getDistributorByID = async (req, res) => {
  try {
    const distributorID = req.params.id;
    const distributor = await getDistributorModelByID(distributorID);

    if (!distributor.exists) {
      res.status(404).send(`error: user ${distributorID} does not exist`);
    }

    res.status(200).send(distributor.data());
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const updateDistributorByID = async (req, res) => {
  try {
    const distributorID = req.params.id;
    await updateDistributorModelByID(distributorID, req.body);

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

const deleteDistributorByID = async (req, res) => {
  try {
    const distributorID = req.params.id;
    await deleteDistributorModelByID(distributorID);

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
  addDistributor,
  getAllDistributors,
  getDistributorByID,
  updateDistributorByID,
  deleteDistributorByID,
};
