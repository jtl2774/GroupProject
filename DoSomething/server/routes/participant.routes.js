const ParticipantController = require('../controllers/participant.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.get('/api/participants/:id', ParticipantController.getParticipant); 
    // this route now has to be authenticated
    app.get('/api/subscriptions', authenticate, ParticipantController.getSubscriptions); 
    app.post('/api/participant/join/:id', authenticate, ParticipantController.createParticipant);     /* This is new */
    app.delete('/api/participant/delete/:id', authenticate, ParticipantController.cancelJoin);
}

