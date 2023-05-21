const SubscriptionController = require('../controllers/subscription.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.get('/api/participants/:id', SubscriptionController.getParticipants); 
    // this route now has to be authenticated
    app.get('/api/subscriptions', authenticate, SubscriptionController.getSubscriptions); 
    app.get('/api/subscription/join/:id', authenticate, SubscriptionController.createSubscription);     /* This is new */
    app.delete('/api/subscription/delete/:id', authenticate, SubscriptionController.deleteSubscription);
}

