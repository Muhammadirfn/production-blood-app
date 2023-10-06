const mongoose = require('mongoose');
const inventryModel = require('../models/inventryModel');
const userModel = require('../models/userModel');

// add inventry controller
const createinventryController = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    // Check user.role only if user exists
    // if (inventryType === 'in' && user.role !== 'donar') {
    //   throw new Error('Not a Donar Account');
    // }

    // Check user.role only if user exists
    // if (inventryType === 'out' && user.role !== 'hospital') {
    //   throw new Error('Not a Hospital Owner');
    // }
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total Out", totalOutOfRequestedBloodGroup);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      

      //in & Out Calc
      const availableQuanityOfBloodGroup = Math.max(totalIn - totalOut, 0);
console.log(availableQuanityOfBloodGroup);

// Quantity validation
if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
  return res.status(500).send({
    success: false,
    message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
  });

      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    
    

    // save the record
    const inventry = new inventryModel(req.body);
    await inventry.save();

    return res.status(201).send({
      success: true,
      message: "New Blood added successfully",
    });
  } catch (error) {
    console.error("Error creating inventry:", error); // Log the error
    res.status(500).send({
      success: false,
      message: "There is an error while creating the inventry",
     
    });
  }
}
// get all the blood records

const getInventryController = async (req, res) => {
  try {
    // const userId = req.body.userId; // Ensure userId is correct

    // console.log("Request userId:", userId);

    const inventry = await inventryModel
    .find({ organisation: req.body.userId })
      .populate('hospital')
      .populate('donar').sort({createdAt: -1});

    // console.log("Fetched inventry:", inventry); // Log the fetched inventry

    return res.status(200).send({
      success: true,
      message: "Get all the inventry successful",
      inventry
    });
  } catch (error) {
    console.error("Error in Getting all the records:", error);
    res.status(500).send({
      success: false,
      message: "There is an error while getting the inventry",
    });
  }
}


// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const filters = req.body.filters 
    const inventory = await inventryModel
      .find(filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
      // console.log(inventory);
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// get donor record
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    // find donors
    const donorsId = await inventryModel.distinct('donar', {
      organisation,
    });
    const donors = await userModel.find({ _id: { $in: donorsId } });

    if (!donors || donors.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No donors found for the given organisation.',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Donor records retrieved successfully.',
      donors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Donor records',
      error,
    });
  }
};


// get hospital records
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};
// get organisation Profile
const getOrganisationController = async (req,res)=>{
  try {
    const donar = req.body.userId
    const orgId = await inventryModel.distinct('organisation',{donar})
    // find the org id
    const organisations = await userModel.find({
      _id: {$in: orgId}
    })
    return res.status(200).send({
      success: true,
      message: "Organisation Data Fetched Successfully",
      organisations,
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get ORG API",
      error,
    });
    
  }
}
// get organisation for hospital 
const OrganisationHospitalController = async (req,res)=>{
  try {
    const hospital = req.body.userId
    const orgId = await inventryModel.distinct('organisation',{hospital})
    // find the org id
    const organisations = await userModel.find({
      _id: {$in: orgId}
    })
    return res.status(200).send({
      success: true,
      message: "Hospital Data Fetched Successfully",
      organisations,
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get ORG API",
      error,
    });
    
  }
}


module.exports = { createinventryController, getInventryController, getDonarsController,getHospitalController, getOrganisationController,OrganisationHospitalController, getInventoryHospitalController };
