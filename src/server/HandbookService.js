import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

let postCreateNewHandbookService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.topicHandbook ||
        !data.imageBase64 ||
        !data.desHTML ||
        !data.desMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        await db.Handbook.create({
          topicHandbook: data.topicHandbook,
          image: data.imageBase64,
          desHTML: data.desHTML,
          desMarkdown: data.desMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Save handbook succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getHandbookByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          message: "Missing params",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: {
            id: inputId,
          },
          attributes: ["desHTML", "desMarkdown"],
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }

        if (!data) data = {};

        resolve({
          errCode: 0,
          message: "Get handbook succeed!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHandbookService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll({
        attributes: ["id", "image", "topicHandbook"],
      });
      if (data && data.length > 0) {
        data.map((item) => {
          if (item && item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }
        });
      }
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

let updateHandbookById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.topicHandbook) {
        resolve({
          errCode: 2,
          message: "Missing params",
        });
      }
      let handbook = await db.Handbook.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });

      if (handbook) {
        handbook.topicHandbook = data.name;

        await handbook.save();

        resolve({
          errCode: 0,
          message: "OK",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Clinic's not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteHandbook = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let handbook = await db.Handbook.findOne({
        where: {
          id: inputId,
        },
        raw: false,
      });
      if (!handbook) {
        resolve({
          errCode: 2,
          message: "The handbook isn't exist!",
        });
      }

      handbook.destroy().then(function () {
        resolve({
          errCode: 0,
          message: "OK",
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postCreateNewHandbookService,
  getHandbookByIdService,
  getAllHandbookService,
  updateHandbookById,
  deleteHandbook,
};
