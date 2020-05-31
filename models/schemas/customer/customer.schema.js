/** packages */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        document: {
            type:"String",
            required: true,
            unique: true
        },
        name: {
            type:"String",
            required: true
        },
        lastname: {
            type:"String",
            required: true
        },
        email: {
            type:"String",
            required: true,
            unique: true
        },
        birthdate:{
            type: "Date",
            required: false
        },
        credit: {
            type: "Number",
            min: 0,
            max: 1000000
        },
        password:{
            type: "String",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = customerSchema;