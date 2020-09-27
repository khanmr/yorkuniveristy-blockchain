// import libraries
const express = require("express");
const bodyParser = require("body-parser");

const { getAPI, initApp } = require("./src/config/firebase");

// initialize firebase
initApp();

// initialize express
const app = express();
const main = express();

// add the path to receive requests
// and use bodyParser to process the body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const webAPI = getAPI(main);
module.exports = { webAPI };

// import routes for 'logistics' handling on server
const logisticsRoutes = require("./src/routes/logistics");
app.use("/logistics", logisticsRoutes);

// import routes for 'distributor' handling on server
const distributorRoutes = require("./src/routes/distributors");
app.use("/distributors", distributorRoutes);

// import routes for 'orders' handling on server
const orderRoutes = require("./src/routes/orders");
app.use("/orders", orderRoutes);
