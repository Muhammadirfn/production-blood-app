const express = require('express')
const authMiddleware = require('../middlewares/authmiddelware');
const { createinventryController, getInventryController, getDonarsController, getHospitalController,  OrganisationHospitalController, getInventoryHospitalController, getOrganisationController,  } = require('../controllers/inventryController');


const inventryRouter = express.Router();

// add inventry
inventryRouter.post('/create-inventry', authMiddleware, createinventryController )
// get inventry controller

inventryRouter.get('/get-inventry', authMiddleware, getInventryController)

// get inventry records of the hospital controller

inventryRouter.post('/get-inventry-hospital', authMiddleware, getInventoryHospitalController)

// this is for donars records 
inventryRouter.get('/get-donars', authMiddleware, getDonarsController)
// this is for hospital records 
inventryRouter.get('/get-hospital', authMiddleware, getHospitalController)
// this is for organisation records
inventryRouter.get('/get-organisation', authMiddleware, getOrganisationController)
// this is organisation Hospitals records
inventryRouter.get('/get-organisation-for-hospital', authMiddleware, OrganisationHospitalController)


module.exports = inventryRouter