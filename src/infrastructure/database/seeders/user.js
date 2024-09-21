'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     
      await queryInterface.bulkInsert('Users', [{
        username: 'John Doe',
        phone: 'John Doe',
        email: "124",
        sex: "tien@gmail.com",
        password: "123456789",
        address: "Hue",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
