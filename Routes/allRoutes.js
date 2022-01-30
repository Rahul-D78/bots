const allRoutes = require('express').Router();
const { taskRoute } = require('./tasks');
// const { qesRoute } = require('./question');

allRoutes.use('/', taskRoute);
// allRoutes.use('/', qesRoute);

module.exports = {
    allRoutes
}