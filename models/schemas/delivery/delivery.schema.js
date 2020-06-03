/** packages */
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema


const deliverySchema = new Schema(
    {
        nameProduct: {
            type:"String",
            required: true
        },
        address: {
            type:"String",
            required: true
        },
        phone: {
            type:"String",
            required: true
        },
        deliveryTime:{
            type: "Date",
            required: true
        },
        document: {
            type:"String",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = deliverySchema;