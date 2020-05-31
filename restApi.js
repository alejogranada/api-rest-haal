/** import packages */
const express = require("express");
const config = require("config");
const controller = require("./controllers/customer/customer.controller")
const bodyParser = require("body-parser");

/** server configuration */
let bodyParserJSON = bodyParser.json();
let bodyParserUrlEncoded = bodyParser.urlencoded({ extended: true });
let app = express();
app.use(bodyParserJSON);
app.use(bodyParserUrlEncoded);

/** REST api methods for customer */

// welcome message
app.get("/", (req, res) => {
    res.send("Welcome to my express server.");
});

// POST
app.post("/api/customer/create", (req, res, next) => {
    controller.createCustomer(req, res, next);
});

// GET
app.get("/api/customer/getAll", (req, res, next) => {
    controller.getAllCustomers(req, res, next);
});

app.get("/api/customer/getByDocument/:document", (req, res, next) => {
    controller.getCustomerByDocument(req, res, next);
});

// UPDATE
app.put("/api/customer/update", (req, res, next) => {
    controller.updateCustomer(req, res, next);
});

// DELETE
app.delete("/api/customer/delete", (req, res, next) => {
    controller.removeCustomer(req, res, next);
});

/** Login customer */
app.post("/api/customer/login", (req, res, next) => {

});

/** Run server */
const port = config.get("port");
app.listen(port, () => {
    console.log(`Express server is running in port ${port}`);
});















