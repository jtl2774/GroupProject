const Activity = require('../models/activity.model');    /* this is new */
const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createActivity = (request, response) => {
    request.body.userId = currentUserId; // add userId from JWT
    Activity.create(request.body) //This will use whatever the body of the client's request sends over
        .then(activity => response.json(activity))
        .catch(err => response.status(400).json(err));
}

module.exports.getActivities = (req, res) => {
    Activity.find()
        .then(async (allActivities) => {
            let activities = [];
            for (let i in allActivities) {
                let query = User.findOne({ _id: allActivities[i].userId });
                const user = await query.exec();
                let activity = {
                    "_id": allActivities[i]._id,
                    "userId": allActivities[i].userId,
                    "organizer": user.firstName,
                    "location": allActivities[i].location,
                    "activity": allActivities[i].activity,
                    "dateAndTime": allActivities[i].dateAndTime,
                    "address": allActivities[i].address,
                    "description": allActivities[i].description
                }
                activities.push(activity);
            }

            res.json({ activities })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getActivityDetails = (req, res) => {
    Activity.findOne({ _id: req.params.id })
        .then(oneSingleActivity => {
            res.json({ activity: oneSingleActivity })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateActivity = (request, response) => {

    let userIdCompare = null;
    
    Activity.findOne({ _id: request.params.id })
        .then(oneSingleActivity => {
            userIdCompare = oneSingleActivity.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Activity.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new:true})
            .then(updatedActivity => response.json(updatedActivity))
            .catch(err => response.status(400).json(err));
        })
        .catch((err) => {
            response.json({ message: 'Activity Not Found', error: err })
        });
    
        }
        
module.exports.deleteActivity = (request, response) => {

    let userIdCompare = null;
    
    Activity.findOne({ _id: request.params.id })
        .then(oneSingleActivity => {
            userIdCompare = oneSingleActivity.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Subscription.deleteOne({ userId: currentUserId, activityId: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(() => {
                Activity.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
                .then(deleteConfirmation => response.json(deleteConfirmation))
                .catch(err => response.json(err))
            }
            )
            .catch(err => {
                response.json(err)
            } )


        })
        .catch((err) => {
            response.json({ message: 'Activity Not Found', error: err })
        });
    
        }
        
        module.exports.getMyActivities = (req, res) => {
            currentUserId
            Activity.find({userId: currentUserId})
                .then((allActivities) => {
                    res.json({ activities: allActivities })
                })
                .catch((err) => {
                    res.json({ message: 'Something went wrong', error: err })
                });
        }
        