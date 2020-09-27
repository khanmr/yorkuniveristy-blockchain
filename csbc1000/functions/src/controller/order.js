const { v4: uuidv4 } = require("uuid");
const {
  create: createOrderModel,
  getAll: getAllOrdersModel,
  getByID: getOrderModelByID,
  updateByID: updateOrderModelByID,
  deleteByID: deleteOrderModelByID,
} = require("../model/order");

const addOrder = async (req, res) => {
  try {
    // create a new object
    let order = req.body;
    order["id"] = uuidv4();

    await createOrderModel(order);

    res.status(201).json({
      id: order.id,
      message: "order successfully created",
    });
  } catch (error) {
    // handle errors
    res.status(400).json({
      error: error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersModel();

    res.status(200).send(orders);
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const getOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await getOrderModelByID(orderID);

    if (!order.exists) {
      res.status(404).send(`error: user ${orderID} does not exist`);
    }

    res.status(200).send(order.data());
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const updateOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;
    await updateOrderModelByID(orderID, req.body);

    res.status(200).json({
      message: "order updated successfully",
    });
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

const deleteOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;
    await deleteOrderModelByID(orderID);

    // send response
    res.status(204).json({
      message: "order deleted",
    });
  } catch (error) {
    // handle errors
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderByID,
  updateOrderByID,
  deleteOrderByID,
};
