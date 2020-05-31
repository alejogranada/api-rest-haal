/** packages */
const helper = require("../helper.controller");

/** dto file */
const DTO = require("../../models/dto/customer-dto/customer.dto");

/** customer login */
exports.customerLogin = async (req, res) => {
    //Login a registered customer
    try {
        let customerReq = {
            document: req.body.document,
            password: req.body.password
        };
        const customer = await DTO.findByCredentials(customerReq.document, customerReq.password)
        if (!customer) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await DTO.generateAuthToken(customer)
        res.send({ customer, token })
        console.log("------------------------");
        console.log("Login exitoso!");
        console.log("------------------------");
    } catch (error) {
        res.status(400).send(error)
        console.log("------------------------");
        console.log("Login fallido");
        console.log(error);
        console.log("------------------------");
    }

}
