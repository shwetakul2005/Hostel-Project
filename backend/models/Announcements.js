const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,//id
        ref: 'User', // Links to the User model
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    // optional expiry date
    expiryDate: {
        type: Date,
        default: null // if the announcement is time-sensitive
    }
}, {
    timestamps: true 
});

const AnnouncementModel=mongoose.model('Announcement', AnnouncementSchema); //Creates a collection
module.exports = AnnouncementModel;
