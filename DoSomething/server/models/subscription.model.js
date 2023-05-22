const mongoose = require('mongoose');
const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    activityId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Subscription', SubscriptionSchema);

