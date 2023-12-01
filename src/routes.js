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
const listCategories = require('./controllers/categories');
const {registerProduct, listProducts, productInformation } = require('./controllers/products');
const schemaProducts = require('./schemas/registerProducts');
const route = Router();

route.get('/categoria', listCategories);
route.post('/usuario', validateBodyRequisition(schemaUsers), registerUser);
route.post('/login', validateBodyRequisition(loginSchema), login);

route.use(userAuthentication);

route.get('/usuario', getUserDetails);
route.put('/usuario', validateBodyRequisition(schemaUsers), updateUserData);

route.get('/produto', listProducts);
route.get('/produto/:id', productInformation);
route.post(
  '/produto',
  validateBodyRequisition(schemaProducts),
  registerProduct
);

module.exports = route;