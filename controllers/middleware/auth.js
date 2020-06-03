const jwt = require('jsonwebtoken')
/** Customer */
const User = require("../../models/dto/customer-dto/customer.dto");

const config = require("config");

const jwtKey = config.get("JWT_KEY");

const auth = async(req, res, next) => {
    console.log(req.header('Authorization'));
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const data = jwt.verify(token, jwtKey);
    console.log("data");
    console.log(data);
    console.log(jwtKey);
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        console.log(user);
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

module.exports = auth