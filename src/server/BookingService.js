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

module.exports = {
  getAllBookingService,
};
