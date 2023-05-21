const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    location: {
        type: String,
        required:  [
            true,
            "Location is required"
        ],
        trim: true
    },
    activity: {
        type: String,
        required:  [
            true,
            "Activity is required"
        ],
        trim: true
    },
    dateAndTime: {
        type: String,
        required:  [
            true,
            "Date and Time is required"
        ],
        trim: true
    },
    address: {
        type: String,
        required:  [
            true,
            "Address is required"
        ],
        trim: true
    },
    description: {
        type: String,
        required:  [
            true,
            "Description is required"
        ],
        trim: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Activity', ActivitySchema);

