/** packages */
const helper = require("../helper.controller");

/** dto file */
const DTO = require("../../models/dto/customer-dto/customer.dto");

/** creating new customer */
exports.createCustomer = (req, res, next) => {
    let customer = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        credit: req.body.credit,
        password: req.body.password
    };

    console.log("------------------------");
    console.log("USUARIO CREADO!");
    console.log(customer.document);
    console.log(customer.name);
    console.log(customer.password);
    DTO.create(customer, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK",
            data: data
        });
    });

    console.log(customer.password);
    console.log("------------------------");
}


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


// get all customers
exports.getAllCustomers = (req, res, next) => {
    DTO.getAll({}, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK",
            data: data
        });
    });
}


// get customer by document
exports.getCustomerByDocument = (req, res, next) => {
    DTO.getByDocument({ document: req.params.document }, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK",
            data: data
        });
    });
}


/** updating a customer */
exports.updateCustomer = (req, res, next) => {
    let customer = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        credit: req.body.credit
    };

    DTO.update({ _id: req.body.id }, customer, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK",
            data: data
        });
    });
}

// remove customer by id
exports.removeCustomer = (req, res, next) => {
    DTO.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK"
        });
    });
}
