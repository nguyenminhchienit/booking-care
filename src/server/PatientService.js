import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import EmailService from "./EmailService";
import { hashUserPassword } from "../server/UserService";

let buildUrlVerifyMail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let handlePostAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.address ||
        !data.selectedGender
      ) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.email);
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.fullName,
            address: data.address,
            gender: data.selectedGender,
            roleId: "R3",
          },
        });
        let token = uuidv4();

        await EmailService.sendEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          doctorName: data.doctorName,
          redirectLink: buildUrlVerifyMail(data.doctorId, token),
          time: data.timeString,
        });
        //upsert ( insert/update)

        //console.log("check user: ",user[0]) // true or false
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
              reason: data.reason,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "Save patient succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();

          resolve({
            errCode: 0,
            message: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Update the appointment failed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBookingsForPatientService = (patientId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!patientId) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            patientId: patientId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "doctorData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          message: "Get booking succeed",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postHandleSendCancelBookingService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.doctorId ||
        !data.patientId ||
        !data.timeType ||
        !data.patientData.email
      ) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        //update trang thai benh nhan da kham xong
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S4";
          await appointment.save();
        }

        //Send email
        await EmailService.sendCancelBooking(data);

        resolve({
          errCode: 0,
          message: "Cancel booking succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handlePostAppointmentService,
  postVerifyBookAppointmentService,
  getBookingsForPatientService,
  postHandleSendCancelBookingService,
};
