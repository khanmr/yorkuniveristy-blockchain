const { getDB } = require("../config/firebase");

const db = getDB();
const ordersCollection = "orders";

const create = async (orders) => {
  // asynchronously send this to the database
  await db
    .collection(ordersCollection)
    .doc(orders.id)
    .set(Object.assign({}, orders));
};

const getAll = async () => {
  // asynchronously fetch from the database
  const query = await db.collection(ordersCollection).get();

  // build response
  let orders = [];
  query.forEach((doc) => {
    orders.push(doc.data());
  });

  return orders;
};

const getByID = async (orderID) => {
  // asynchronously fetch from the database
  const order = await db.collection(ordersCollection).doc(orderID).get();

  return order;
};

const updateByID = async (orderID, data) => {
  // asynchronously update in the database
  const order = db.collection(ordersCollection).doc(orderID);

  await order.set(data, { merge: true });
};

const deleteByID = async (orderID) => {
  // asynchronously delete the document from the database
  await db.collection(ordersCollection).doc(orderID).delete();
};

module.exports = {
  create,
  getAll,
  getByID,
  updateByID,
  deleteByID,
};
