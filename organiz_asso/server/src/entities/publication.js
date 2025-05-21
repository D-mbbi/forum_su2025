const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    userID: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    answeredPostID: {
        type: String, 
        required: false,
        default: ""
    },
    comments: {
        type: Array,
        default: []
    },
    forumID: {
        type: String, 
        required: true,
        default: process.env.FORUM_PUBLIC
    }
});

module.exports = mongoose.model('Publication', publicationSchema);