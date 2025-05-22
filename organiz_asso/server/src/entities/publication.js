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
        default: ""
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
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Publication', publicationSchema);