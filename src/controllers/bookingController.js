import BookingService from "../server/BookingService";
import db from "../models/index";
const { Sequelize, Op } = require("sequelize");

let getAllBooking = async (req, res) => {
  try {
    let info = await BookingService.getAllBookingService();
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let fetchDataByMonth = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const data = await db.Booking.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      where: {
        createdAt: {
          [Op.between]: [
            new Date(`${currentYear}-01-01`),
            new Date(`${currentYear}-12-31`),
          ],
        },
      },
      group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
    });

    //const result = Array(12).fill({ month: null, count: 0 });
    const result = Array(12)
      .fill()
      .map((_, index) => ({ month: index + 1, count: 0 }));

    data.forEach((item) => {
      const month = item.month;
      const count = item.count;
      result[month - 1] = { month, count };
    });

    let kq = [];
    result.forEach((result) => {
      const month = result.month;
      const count = result.count;
      kq.push(count);
    });

    return res.status(200).json({
      errCode: 0,
      data: kq,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getBookingWithDay = async (req, res) => {
  try {
    let info = await BookingService.getBookingWithDayService(
      req.query.dayBooking
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
  getAllBooking,
  fetchDataByMonth,
  getBookingWithDay,
};
