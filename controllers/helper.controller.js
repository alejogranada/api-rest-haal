/** packages */
const bcrypt = require('bcrypt');

exports.EncryptPassword = (plainTextPassword) => {
    console.log(plainTextPassword);
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(plainTextPassword, salt).then(function (hash){
            
        });
    });
}
