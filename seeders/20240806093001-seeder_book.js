'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        code: 'SHR-1',
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        code: 'TW-11',
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
