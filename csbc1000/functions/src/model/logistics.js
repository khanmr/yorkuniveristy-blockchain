const { getDB } = require("../config/firebase");

const db = getDB();
const logisticsCollection = "logistics";

const create = async (logistics) => {
  // asynchronously send this to the database
  await db
    .collection(logisticsCollection)
    .doc(logistics.id)
    .set(Object.assign({}, logistics));
};

const getAll = async () => {
  // asynchronously fetch from the database
  const query = await db.collection(logisticsCollection).get();

  // build response
  let logistics = [];
  query.forEach((doc) => {
    logistics.push(doc.data());
  });

  return logistics;
};

const getByID = async (logisticsID) => {
  // asynchronously fetch from the database
  const logistics = await db
    .collection(logisticsCollection)
    .doc(logisticsID)
    .get();

  return logistics;
};

const updateByID = async (logisticsID, data) => {
  // asynchronously update in the database
  const logistics = db.collection(logisticsCollection).doc(logisticsID);

  await logistics.set(data, { merge: true });
};

const deleteByID = async (logisticsID) => {
  // asynchronously delete the document from the database
  await db.collection(logisticsCollection).doc(logisticsID).delete();
};

module.exports = { create, getAll, getByID, updateByID, deleteByID };
