/** packages */
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema


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
            required: true,
            minLength: 7
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
);

customerSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const customer = this
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next()
})

module.exports = customerSchema;