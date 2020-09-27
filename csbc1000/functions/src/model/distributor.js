const { getDB } = require("../config/firebase");

const db = getDB();
const distributorsCollection = "distributors";

const create = async (distributor) => {
  // asynchronously send this to the database
  await db
    .collection(distributorsCollection)
    .doc(distributor.id)
    .set(Object.assign({}, distributor));
};

const getAll = async () => {
  // asynchronously fetch from the database
  const query = await db.collection(distributorsCollection).get();

  // build response
  let distributors = [];
  query.forEach((doc) => {
    distributors.push(doc.data());
  });

  return distributors;
};

const getByID = async (distributorID) => {
  // asynchronously fetch from the database
  const distributor = await db
    .collection(distributorsCollection)
    .doc(distributorID)
    .get();

  return distributor;
};

const updateByID = async (distributorID, data) => {
  // asynchronously update in the database
  const distributor = db.collection(distributorsCollection).doc(distributorID);

  await distributor.set(data, { merge: true });
};

const deleteByID = async (distributorID) => {
  // asynchronously delete the document from the database
  await db.collection(distributorsCollection).doc(distributorID).delete();
};

module.exports = {
  create,
  getAll,
  getByID,
  updateByID,
  deleteByID,
};
