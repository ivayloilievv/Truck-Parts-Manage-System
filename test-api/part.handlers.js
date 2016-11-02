
'use strict';

const mongodb = require('mongodb');
const assert = require('assert');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('parts').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs.map((part) => {
                part.id = part._id;
                delete (part._id);
                return part;
            }));
        }
    );
};

exports.find = function (request, reply) {
    this.db.collection('parts', function (err, parts_collection) {
        if (err) throw err;
        parts_collection.findOne({ _id: new mongodb.ObjectID(request.params.partId) },
            (err, part) => {
                if (err) throw err;
                if (part === null) {
                    reply(Boom.notFound(`Part with Id=${request.params.partId} not found.`));
                } else {
                    part.id = part._id;
                    delete (part._id);
                    reply(part);
                }

            });
    });
};

exports.findCatalogNumber = function (request, reply) {
    this.db.collection('parts', function (err, parts_collection) {
        console.log(request);
        if (err) throw err;
        parts_collection.findOne( {"catalogNumber":  request.params.partCatalogNumber },
            (err, part) => {
                if (err) throw err;
                if (part === null) {
                    reply(Boom.notFound(`Part with Id=${request.params.partCatalogNumber} not found.`));
                } else {
        
                    reply(part);
                }

            });
    });
};

exports.create = function (request, reply) {
    let part = request.payload;
    let collection = this.db.collection('parts');
    console.log('Inserting part:', part);
    collection.insertOne(part).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            const partUri = request.raw.req.url + '/' + part._id;
            reply(replaceId(part)).created(partUri);
        } else {
            reply(Boom.badRequest(`Invalid part data: ${part}`));
        }
    }).
        catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.edit = function (request, reply) {
    let part = request.payload;
    if (part.id !== request.params.partId) {
        reply(Boom.badRequest(`Invalid part data - id in url doesn't match: ${part}`));
        return;
    }
    part._id = new mongodb.ObjectID(part.id);
    delete (part.id);
    let collection = this.db.collection('parts');
    console.log('Editing part:', part);
    collection.updateOne({ _id: new mongodb.ObjectID(part._id) }, { "$set": part })
        .then((result) => {
            part = replaceId(part);
            if (result.result.ok && result.modifiedCount === 1) {
                reply(part);
            } else {
                reply(Boom.badRequest(`Data was NOT modified in database: ${JSON.stringify(part)}`));
            }
        }).catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.remove = function (request, reply) {
    let collection = this.db.collection('parts');
    collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.partId) })
        .then((result) => {
            if (result.ok) {
                console.log('Deleted: ', request.raw.req.url);
                reply(replaceId(result.value));
            } else {
                reply(Boom.notFound(`Part with Id=${request.params.partId} not found.`));
            }
        }).catch((err) => {
            reply(Boom.notFound(`Part with Id=${request.params.partId} not found.`));
        });
};

function replaceId(part) {
    part.id = part._id;
    delete (part._id);
    return part;
}
