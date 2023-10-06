const express = require('express');
const authmiddelware = require('../middlewares/authmiddelware');
const { getDonarsListController, getOrgListController, getDeleteController } = require('../controllers/adminController');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { getHospitalController, getOrganisationController } = require('../controllers/inventryController');


const adminRouter = express.Router();
// get donor list 

adminRouter.get('/donor-list' , authmiddelware, adminmiddleware, getDonarsListController)

// this is for hospitals list
adminRouter.get('/hospital-list' , authmiddelware, adminmiddleware, getHospitalController)
// for the organisation
adminRouter.get('/org-list' , authmiddelware, adminmiddleware, getOrgListController)
// for the deleting the function
// DELETE DONAR || GET
adminRouter.delete(
  "/delete-donar/:id",
  authmiddelware,
  adminmiddleware,
  getDeleteController
);

module.exports = adminRouter

