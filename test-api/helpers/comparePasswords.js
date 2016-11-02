'use strict';

//const bcrypt = require('bcrypt');
const Boom = require('boom');

function comparePasswords(loginPassword, password, callback) {
    bcrypt.compare(loginPassword, password, (err, isValid) => {
        if (isValid) { return callback(err, true); }
        else { Boom.badRequest(err); }
    });
}

module.exports = comparePasswords;