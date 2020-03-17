const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('../users/user.model.js');

const schema = new Schema({
    eventname: { type: String, unique: true, required: true },
    host: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, default: Date.now },
    approve:{type:Boolean,default:false},
    users : { type: Schema.Types.ObjectId, ref: 'Users' }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);