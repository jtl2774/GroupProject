const mongoose = require('mongoose');
const ParticipantSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    eventId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Participant', ParticipantSchema);

