const Event = require('../models/event.model');    /* this is new */
const User = require('../models/user.model');
const Participant = require('../models/participant.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createEvent = (request, response) => {
    request.body.userId = currentUserId; // add userId from JWT
    Event.create(request.body) //This will use whatever the body of the client's request sends over
        .then(event => response.json(event))
        .catch(err => response.status(400).json(err));
}

module.exports.getEvents = (req, res) => {
    Event.find()
        .then(async (allEvents) => {
            let events = [];
            for (let i in allEvents) {
                let query = User.findOne({ _id: allEvents[i].userId });
                const user = await query.exec();
                let event = {
                    "_id": allEvents[i]._id,
                    "userId": allEvents[i].userId,
                    "organizer": user.firstName,
                    "location": allEvents[i].location,
                    "activity": allEvents[i].activity,
                    "date": allEvents[i].date,
                    "address": allEvents[i].address,
                    "desc": allEvents[i].desc
                }
                events.push(event);
            }

            res.json({ events })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getEventDetails = (req, res) => {
    Event.findOne({ _id: req.params.id })
        .then(oneSingleEvent => {
            res.json({ event: oneSingleEvent })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateEvent = (request, response) => {

    let userIdCompare = null;
    
    Event.findOne({ _id: request.params.id })
        .then(oneSingleEvent => {
            userIdCompare = oneSingleEvent.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Event.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators: true, new:true})
            .then(updatedEvent => response.json(updatedEvent))
            .catch(err => response.status(400).json(err));
        })
        .catch((err) => {
            response.json({ message: 'Event Not Found', error: err })
        });
    
        }
        
module.exports.deleteEvent = (request, response) => {

    let userIdCompare = null;
    
    Event.findOne({ _id: request.params.id })
        .then(oneSingleEvent => {
            userIdCompare = oneSingleEvent.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Participant.deleteOne({ userId: currentUserId, eventId: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(() => {
                Event.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
                .then(deleteConfirmation => response.json(deleteConfirmation))
                .catch(err => response.json(err))
            }
            )
            .catch(err => {
                response.json(err)
            } )


        })
        .catch((err) => {
            response.json({ message: 'Event Not Found', error: err })
        });
    
        }
        
        module.exports.getMyEvents = (req, res) => {
            currentUserId
            Event.find({userId: currentUserId})
                .then((allEvents) => {
                    res.json({ events: allEvents })
                })
                .catch((err) => {
                    res.json({ message: 'Something went wrong', error: err })
                });
        }
        