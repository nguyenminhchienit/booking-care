"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('Bookings', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   statusId: {
    //     type: Sequelize.STRING
    //   },
    //   doctorId: {
    //     type: Sequelize.INTEGER
    //   },
    //   patientId: {
    //     type: Sequelize.INTEGER
    //   },
    //   date: {
    //     type: Sequelize.STRING
    //   },
    //   timeType: {
    //     type: Sequelize.STRING
    //   },
    //   token: {
    //     type: Sequelize.STRING
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
    return queryInterface
      .changeColumn("bookings", "status", {
        type: Sequelize.ENUM("processing", "cancel", "completed"),
        allowNull: false,
        defaultValue: "processing",
      })
      .then(function () {
        return queryInterface.sequelize.query(
          "UPDATE bookings SET status='processing' WHERE status='processing'"
        );
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
