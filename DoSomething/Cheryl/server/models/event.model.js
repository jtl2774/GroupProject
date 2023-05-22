const mongoose =require('mongoose');

const ParticipantsSchema = new mongoose.Schema({
    p_id:{
        type:mongoose.Types.ObjectId
    },
    pFirstName:{
        type:String
    }
})

const EventSchema =  new mongoose.Schema({
    location:{
        type: String,
        required: [true, 'Location is required'],
        minLength: [2,'Location must be 2 or more characters']
    },
    activity:{
        type: String,
        required: [true, 'Activity is required'],
        minLength: [2,'Activity must be 2 or more characters']
    },
    date:{
        type:Date,
        required: [true, 'Date is required'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
        minLength: [3,'Address must be 3 or more characters']
    },
    desc:{
        type: String,
        required: [true, 'Address is required'],
        minLength: [3,'Address must be 3 or more characters']
    },
    //this for user who create the event
    creator_id:{
        type:mongoose.Types.ObjectId
    },
    //for users info who attend the event
    participants:[ParticipantsSchema]
}, {timestamps:true})

module.exports = mongoose.model('Event', EventSchema )