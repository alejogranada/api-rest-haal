/** packages */
const mongoose = require("mongoose");

/** import files */
const db = require("../../db.connection");
const deliverySchema = require("../../schemas/delivery/delivery.schema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require("config");

/** connection to db */
db();

deliverySchema.statics = {
    create: function (data, cb) {
        console.log("llega");
        let delivery = new this(data);
        console.log(delivery);
        delivery.save();
    },
    getAll: function (query, cb) {
        this.find(query, cb);
    },
    getByDocument: function (query, cb) {
        this.find(query, cb);
    },
    update: function (query, newData, cb) {
        this.findOneAndUpdate(query, {$set: newData}, {new: true}, cb);
    },
    delete: function (query, cb){
        this.findOneAndDelete(query, cb);
    }
};

let deliveryDTO = mongoose.model("coll_delivery", deliverySchema);
module.exports = deliveryDTO;