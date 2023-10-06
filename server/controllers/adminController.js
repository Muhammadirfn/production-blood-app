const userModel = require("../models/userModel");
//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In DOnar List API",
      error,
    });
  }
};
//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  console.log(getHospitalListController);
  try {
    // Log distinct roles in the database
    const distinctRoles = await userModel.distinct("role");
    console.log("Distinct Roles in Database:", distinctRoles);

    // Query hospitals
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    // Log query parameters and hospital data
    console.log("Query Parameters:", { role: "hospital" });
    console.log("Hospital Data:", hospitalData);

    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.error("Error in getHospitalListController:", error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};








//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

// const handle delete function

const getDeleteController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

module.exports = { getDonarsListController ,getHospitalListController ,getOrgListController,getDeleteController};
