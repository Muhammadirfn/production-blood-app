const express = require('express')
const authMiddleware = require('../middlewares/authmiddelware');
const { bloodGroupDetailsController, getRecentinventryController } = require('../controllers/analyticController');

const analyticRouter = express.Router();

// for all the blood get route
analyticRouter.get('/analytics-blood', authMiddleware, bloodGroupDetailsController)
// for all the recent blood get route
analyticRouter.get('/analytics-recent-blood', authMiddleware, getRecentinventryController)


module.exports = analyticRouter