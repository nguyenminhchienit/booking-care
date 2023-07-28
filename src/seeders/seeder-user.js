'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345678',
      firstName: 'Nguyen Minh',
      lastName: 'Chien',
      address: "THPHCM",
      phoneNumber: "0392845906",
      gender: 1,
      image: "",
      roleId: "R1",
      positionId: "Developer",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
