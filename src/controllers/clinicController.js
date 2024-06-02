import ClinicService from "../server/ClinicService";

let postCreateNewClinic = async (req, res) => {
  try {
    let info = await ClinicService.postCreateNewClinicService(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await ClinicService.getAllClinicService();
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getClinicDoctorById = async (req, res) => {
  try {
    let info = await ClinicService.getClinicDoctorByIdService(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let handleUpdateClinicById = async (req, res) => {
  let data = req.body;
  let message = await ClinicService.updateClinicById(data);
  return res.status(200).json(message);
};

let handleDeleteClinic = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing params!!",
    });
  }
  let message = await ClinicService.deleteClinic(id);
  return res.status(200).json(message);
};

module.exports = {
  postCreateNewClinic,
  getAllClinic,
  getClinicDoctorById,
  handleUpdateClinicById,
  handleDeleteClinic,
};
