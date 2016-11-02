'use strict'

//const bcrypt = require('bcrypt');
const Boom = require('boom');

function hashPassword(password, callback) {
    bcrypt.genSalt(null, (err, salt) => {
        if (err) { Boom.badRequest(err); }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) { Boom.badRequest(err); }

            return callback(err, hash);
        });
    });
}



module.exports = hashPassword;
