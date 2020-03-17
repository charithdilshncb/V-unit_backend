const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('../users/user.model.js');

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    brief: { type: String, required: true },
    approve:{type:Boolean,default:false},
    users : { type: Schema.Types.ObjectId, ref: 'Users' }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Request', schema);