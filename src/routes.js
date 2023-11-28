const { Router } = require('express');
const validateBodyRequisition = require('./middlewares/validateBodyRequisition');
const schemaUsers = require('./schemas/registerUsers');
const {
  registerUser,
  login,
  updateUserData,
  getUserDetails,
} = require('./controllers/users');
const loginSchema = require('./schemas/login');
const userAuthentication = require('./middlewares/authentication');
const route = Router();

route.post('/usuario', validateBodyRequisition(schemaUsers), registerUser);
route.post('/login', validateBodyRequisition(loginSchema), login);

route.use(userAuthentication);

route.get('/usuario', getUserDetails);
route.put('/usuario', updateUserData);

module.exports = route;
