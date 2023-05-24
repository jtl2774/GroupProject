const Participant = require('../models/participant.model');    /* this is new */
const Event = require('../models/event.model');
const User = require('../models/user.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
          /* The method below is new */
module.exports.createParticipant = (request, response) => {
    params = {
        userId: currentUserId,
        eventId: request.params.id
    };
    Participant.findOne({userId: currentUserId, eventId: request.params.id})
        .then(async (participant) => {
        console.log(participant);
        if (participant) {
            response.status(400).json({ message: 'Already Joined', error: 'Already Joined' });
        } else {
            Participant.create(params) //This will use whatever the body of the client's request sends over
                .then(participant => response.json(participant))
                .catch(err => response.status(400).json(err));
        }
        }).catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.getSubscriptions = (req, res) => {
    Participant.find({userId: currentUserId})
        .then(async (allParticipants) => {
            let participants = [];
            for (let i in allParticipants) {
                let query = Event.findOne({ _id: allParticipants[i].eventId });
                const event = await query.exec();
                let participant = {
                    "_id": allParticipants[i]._id,
                    "userId": allParticipants[i].userId,
                    "eventId": allParticipants[i].eventId,
                    "location": event.location,
                    "activity": event.activity,
                    "participant": event.participant
                }
                participants.push(participant);
            }
            res.json({ participants })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getParticipant = (req, res) => {
    Participant.find({eventId: req.params.id})
        .then(async (allParticipants) => {
            let participants = [];
            for (let i in allParticipants) {
                let query = User.findOne({ _id: allParticipants[i].userId });
                const user = await query.exec();
                let participant = {
                    "_id": allParticipants[i]._id,
                    "userId": allParticipants[i].userId,
                    "eventId": allParticipants[i].eventId,
                    "firstName": user.firstName
                }
                participants.push(participant);
            }
            res.json({ participants })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.deleteParticipant = (request, response) => {

    let userIdCompare = null;
    
    Participant.findOne({ _id: request.params.id })
        .then(oneSingleParticipant => {
            userIdCompare = oneSingleParticipant.userId;
            let authError = "Not Authorized";
            if (currentUserId != userIdCompare) { // check userId from JWT
                return response.status(400).json({ message: authError, error: authError });
            }
            Participant.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
        })
        .catch((err) => {
            response.json({ message: 'Participant Not Found', error: err })
        });
    
}
module.exports.cancelJoin = (req, res) =>{
    Participant.deleteOne({userId: currentUserId, eventId: req.params.id})
    .then((result) =>{
        res.json(result)
    })
    .catch((err) =>{
        res.status(400).json(err)
    })


}

        