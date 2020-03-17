const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Request = db.Request;

module.exports = {
    getAll,
    getById,
    create,
    findById,
    update,
    getAllRequest,
    delete: _delete
};

async function getAll() {
    return await Request.find().select('-hash');
}

async function getAllRequest() {
    return await Request.find().select('-hash');
}

async function getById(id) {
    return await Request.findById(id).select('-hash');
}
async function findById(id) {
    return await Request.findById(id).select('guestList');
}
async function create(requestParam) {
    const request = new Request(requestParam);

    // save event
    await request.save();
}

async function update(id, requestParam) {
    const request = await Request.findById(id);

     //validate
    if (!request) throw 'request not found';
    if (request.title !== requestParam.title && await Request.findOne({ title: requestParam.title })) {
        throw 'title "' + requestParam.title + '" is already taken';
    }
    // copy eventParam properties to event
    Object.assign(request, requestParam);

    await request.save();
}

async function _delete(id) {
    await Request.findByIdAndRemove(id);
}