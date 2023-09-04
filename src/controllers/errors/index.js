//Importing error controllers
const errorController = require('./errorController');
const notFoundController = require('./notFoundController');

//Exporting error controllers
module.exports = {
    errorController,
    notFoundController,
};