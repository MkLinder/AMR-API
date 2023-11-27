const { Router } = require('express');
const validateBodyRequisition = require('./middlewares/validateBodyRequisition');
const schemaUsers = require('./schemas/registerUsers');
const { registerUser } = require('./controllers/users');
const route = Router();


route.post('/usuario', validateBodyRequisition(schemaUsers), registerUser);


module.exports = route;