const { Router } = require('express');
const validateBodyRequisition = require('./middlewares/validateBodyRequisition');
const schemaUsers = require('./schemas/registerUsers');
const { registerUser, login } = require('./controllers/users');
const loginSchema = require('./schemas/login');
const route = Router();


route.post('/usuario', validateBodyRequisition(schemaUsers), registerUser);
route.post('/login', validateBodyRequisition(loginSchema), login)


module.exports = route;