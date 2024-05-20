import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

let postHistoriesService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.patientId || !data.doctorId || !data.description) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        await db.History.create({
          patientId: data.patientId,
          doctorId: data.doctorId,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "Save histories succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHistoriesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.History.findAll();
      resolve({
        errCode: 0,
        message: "Get histories succeed!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postHistoriesService,
  getAllHistoriesService,
};
