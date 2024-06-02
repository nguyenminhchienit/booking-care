import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";
import historyController from "../controllers/historyController";
import bookingController from "../controllers/bookingController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);

  router.get("/get-crud", homeController.displayGetCRUD);

  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);

  router.get("/delete-crud", homeController.deleteCRUD);

  //VIET API
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.handleGetAllCode);

  router.get("/api/get-doctor", doctorController.handleGetDoctor);
  router.get("/api/get-all-doctor", doctorController.handleGetAllDoctor);
  router.post("/api/post-info-doctor", doctorController.handlePostInfoDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.handleGetDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-doctor", doctorController.getScheduleDoctor);
  router.get(
    "/api/get-extra-doctor-info-by-id",
    doctorController.getExtraDoctorInfo
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );

  router.get(
    "/api/get-list-patient-for-doctor-done",
    doctorController.getListPatientForDoctorDone
  );

  router.post("/api/post-send-remedy", doctorController.postHandleSendRemedy);
  router.post(
    "/api/post-send-remedy-done",
    doctorController.postHandleSendRemedyDone
  );

  router.post(
    "/api/post-book-appointment",
    patientController.handlePostAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  router.post(
    "/api/create-new-specialty",
    specialtyController.postCreateNewSpecialty
  );
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-specialty-doctor-by-id",
    specialtyController.getSpecialtyDoctorById
  );

  router.post("/api/create-new-clinic", clinicController.postCreateNewClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-clinic-doctor-by-id",
    clinicController.getClinicDoctorById
  );

  router.put("/api/update-clinic", clinicController.handleUpdateClinicById);
  router.delete("/api/delete-clinic", clinicController.handleDeleteClinic);

  router.get("/api/search-specialty", specialtyController.handleSearch);

  router.post(
    "/api/create-new-handbook",
    handbookController.postCreateNewHandbook
  );
  router.get("/api/get-handbook-by-id", handbookController.getHandbookById);
  router.get("/api/get-all-handbook", handbookController.getAllHandbook);

  router.post("/api/post-histories", historyController.postHistories);
  router.get("/api/get-all-histories", historyController.getAllHistories);

  router.get("/api/get-all-bookings", bookingController.getAllBooking);
  router.get("/api/get-booking-with-month", bookingController.fetchDataByMonth);
  router.get("/api/get-booking-with-day", bookingController.getBookingWithDay);

  router.get("/api/get-booking-user", patientController.getBookingUser);
  router.put(
    "/api/get-booking-cancel",
    patientController.postHandleSendCancelBooking
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
