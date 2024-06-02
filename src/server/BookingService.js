const { Sequelize, Op } = require("sequelize");
import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

let getAllBookingService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.findAll();
      resolve({
        errCode: 0,
        message: "Get handbook succeed!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getBookingWithDayService = (dayBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Booking.findAll({
        where: {
          date: dayBooking,
          statusId: {
            [Op.ne]: "S4",
          },
        },
      });
      resolve({
        errCode: 0,
        message: "Get booking succeed!",
        data: data ? data : [],
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBookingService,
  getBookingWithDayService,
};
