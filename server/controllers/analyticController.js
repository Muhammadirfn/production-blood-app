const inventryModel = require("../models/inventryModel");
const mongoose = require('mongoose');
const userModel = require("../models/userModel");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodgroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId)

    // get data for each blood group
    await Promise.all(
      bloodgroups.map(async (bloodGroup) => {
        // count total in
        const totalbloodIn = await inventryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: 'in',
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);

        // count total out
        const totalbloodOut = await inventryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: 'out',
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);
//// calculate the Blood
const availableblood = (totalbloodIn[0]?.total || 0) - (totalbloodOut[0]?.total || 0);

bloodGroupData.push({
  bloodGroup,
  totalbloodIn: totalbloodIn.length > 0 ? totalbloodIn[0]?.total : 0,
  totalbloodOut: totalbloodOut.length > 0 ? totalbloodOut[0]?.total : 0,
  availableblood,
});
      })
    );

    res.status(200).send({
      success: true,
      message: "Blood group details fetched successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.error("Error in getting blood Record:", error);
    res.status(500).send({
      success: false,
      message: "There is an error while getting the all the blood record",
    });
  }
};

// get blood records of 8 
const getRecentinventryController = async (req,res)=>{
  try {
    const inventry = await userModel.find({
       organisation : new mongoose.Types.ObjectId(req.body.userId)
    }).limit(3).sort({createdAt: -1})
    // console.log(inventry);
    return res.status(200).send({
      success: true,
      message: 'successfully get the Blood',
      inventry
    })
  } catch (error) {
    console.error("Error in getting blood Record:", error);
    res.status(500).send({
      success: false,
      message: "There is an error while getting the recent blood record",
    });
    
  }
}

module.exports = { bloodGroupDetailsController , getRecentinventryController};
