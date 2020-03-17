const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Event = db.Event;

module.exports = {
    getAll,
    getById,
    create,
    findById,
    update,
    delete: _delete
};

async function getAll() {
    return await Event.find().select('-hash');
}

async function getById(id) {
    return await Event.findById(id).select('-hash');
}
async function findById(id) {
    return await Event.findById(id).select('guestList');
}
async function create(eventParam) {
    const event = new Event(eventParam);

    // save event
    await event.save();
}

async function update(id, eventParam) {
    const event = await Event.findById(id);

    // validate
    if (!event) throw 'Event not found';
    if (event.eventname !== eventParam.eventname && await Event.findOne({ eventname: eventParam.eventname })) {
        throw 'Eventname "' + eventParam.eventname + '" is already taken';
    }
    // copy eventParam properties to event
    Object.assign(event, eventParam);

    await event.save();
}

async function _delete(id) {
    await Event.findByIdAndRemove(id);
}