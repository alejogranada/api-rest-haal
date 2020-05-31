/** packages */
const mongoose = require("mongoose");

/** import files */
const db = require("../../db.connection");
const customerSchema = require("../../schemas/customer/customer.schema");

/** connection to db */
db();

customerSchema.statics = {
    create: function (data, cb) {
        let customer = new this(data);
        customer.save();
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

let customerDTO = mongoose.model("coll_customer", customerSchema);
module.exports = customerDTO;