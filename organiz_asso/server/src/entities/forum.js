const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const forumSchema = mongoose.Schema({
    name: {type: String, required: true},
    admin: { type: Boolean, required: true}
});

forumSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Forum', forumSchema);