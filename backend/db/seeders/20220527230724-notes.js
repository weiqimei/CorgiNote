'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [{
      title: 'Note #1',
      content: 'This is the first note',
      notebookId: 1,
      tagId: 1
    },
    {
      title: 'Note #2',
      content: 'This is the second note',
      notebookId: 2,
      tagId: 2
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
