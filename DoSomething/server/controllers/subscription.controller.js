const Subscription = require('../models/subscription.model');    /* this is new */
const Activity = require('../models/activity.model');
const User = require('../models/user.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createSubscription = (request, response) => {
    params = {
        userId: currentUserId,
        activityId: request.params.id
    };
    Subscription.findOne({userId: currentUserId, activityId: request.params.id})
        .then(async (subscription) => {
        console.log(subscription);
        if (subscription) {
            response.json({ message: 'Already Subscribed', error: 'Already Subscribed' });
        } else {
            Subscription.create(params) //This will use whatever the body of the client's request sends over
                .then(subscription => response.json(subscription))
                .catch(err => response.status(400).json(err));
        }
        }).catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.getSubscriptions = (req, res) => {
    Subscription.find({userId: currentUserId})
        .then(async (allSubscriptions) => {
            let subscriptions = [];
            for (let i in allSubscriptions) {
                let query = Activity.findOne({ _id: allSubscriptions[i].activityId });
                const activity = await query.exec();
                let subscription = {
                    "_id": allSubscriptions[i]._id,
                    "userId": allSubscriptions[i].userId,
                    "activityId": allSubscriptions[i].activityId,
                    "location": activity.location,
                    "activity": activity.activity
                }
                subscriptions.push(subscription);
            }
            res.json({ subscriptions })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getParticipants = (req, res) => {
    Subscription.find({activityId: req.params.id})
        .then(async (allSubscriptions) => {
            let participants = [];
            for (let i in allSubscriptions) {
                let query = User.findOne({ _id: allSubscriptions[i].userId });
                const user = await query.exec();
                let participant = {
                    "_id": allSubscriptions[i]._id,
                    "userId": allSubscriptions[i].userId,
                    "activityId": allSubscriptions[i].activityId,
                    "firstName": user.firstName,
                    "picture": user.picture
                }
                participants.push(participant);
            }
            res.json({ participants })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.deleteSubscription = (request, response) => {

    let userIdCompare = null;
    
    Subscription.findOne({ _id: request.params.id })
        .then(oneSingleSubscription => {
            userIdCompare = oneSingleSubscription.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Subscription.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
        })
        .catch((err) => {
            response.json({ message: 'Subscription Not Found', error: err })
        });
    
        }
        