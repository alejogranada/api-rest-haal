/** packages */
const mongoose = require("mongoose");

/** import files */
const db = require("../../db.connection");
const customerSchema = require("../../schemas/customer/customer.schema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require("config");

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
    },
    findByCredentials: async function (document, password){
        // Search for a user by email and password.
        const customer = await this.findOne({ document} )
        if (!customer) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        console.log(`${password} - - ${customer.password}`);
        const isPasswordMatch = await bcrypt.compare(password, customer.password)
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return customer
    },
    generateAuthToken: async function(customer) {
        // Generate an auth token for the user
        console.log(`CUSTOMER - ${customer._id}`);
        
        const jwtKey = config.get("JWT_KEY");
        console.log(`jwtkey - ${jwtKey}`);
        const token = jwt.sign({_id: customer._id}, jwtKey)
        customer.tokens = customer.tokens.concat({token})
        await customer.save()
        return token
    }
};

let customerDTO = mongoose.model("coll_customer", customerSchema);
module.exports = customerDTO;