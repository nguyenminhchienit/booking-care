import PatientService from "../server/PatientService";

let handlePostAppointment = async (req, res) => {
  try {
    let info = await PatientService.handlePostAppointmentService(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let postVerifyBookAppointment = async (req, res) => {
  try {
    let info = await PatientService.postVerifyBookAppointmentService(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getBookingUser = async (req, res) => {
  try {
    let info = await PatientService.getBookingsForPatientService(
      req.query.patientId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let postHandleSendCancelBooking = async (req, res) => {
  try {
    let info = await PatientService.postHandleSendCancelBookingService(
      req.body
    );
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

module.exports = {
  handlePostAppointment,
  postVerifyBookAppointment,
  getBookingUser,
  postHandleSendCancelBooking,
};
