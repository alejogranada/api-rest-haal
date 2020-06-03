/** packages */
const helper = require("../helper.controller");

/** dto file */
const DTO = require("../../models/dto/delivery-dto/delivery.dto");

/** creating new customer */
exports.createDelivery = (req, res, next) => {
    let delivery = {
        nameProduct: req.body.nameProduct,
        address: req.body.address,
        phone: req.body.phone,
        deliveryTime: req.body.deliveryTime,
        document: req.body.document
    };

    console.log(delivery);

    DTO.create(delivery, (err, data) => {
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

/** updating a delivery */
exports.updateDelivery = (req, res, next) => {
    let delivery = {
        nameProduct: req.body.nameProduct,
        address: req.body.address,
        phone: req.body.phone,
        deliveryTime: req.body.deliveryTime,
        document: req.body.document
    };

    DTO.update({ _id: req.body.id }, delivery, (err, data) => {
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

// remove delivery by id
exports.removeDelivery = (req, res, next) => {
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

// get all products
exports.getAllProducts = (req, res, next) => {
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


// get delivery by document
exports.getDeliveryByDocument = (req, res, next) => {
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