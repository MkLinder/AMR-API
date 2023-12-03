const { Router } = require('express');
const route = Router();
const validateBodyRequisition = require('./middlewares/validateBodyRequisition');
const userAuthentication = require('./middlewares/authentication');
const listCategories = require('./controllers/categories');
const {
  registerProduct,
  updateProductData,
  listProducts,
  productInformation,
  deleteProduct,
} = require('./controllers/products');
const {
  registerCustomer,
  editCustomerData,
  listCustomers,
  getCustomerDetails,
} = require('./controllers/customers');
const schemaUsers = require('./schemas/registerUsers');
const {
  registerUser,
  login,
  updateUserData,
  getUserDetails,
} = require('./controllers/users');
const loginSchema = require('./schemas/login');
const schemaProducts = require('./schemas/registerProducts');
const schemaCustomers = require('./schemas/registerCustomer');

route.get('/categoria', listCategories);
route.post('/usuario', validateBodyRequisition(schemaUsers), registerUser);
route.post('/login', validateBodyRequisition(loginSchema), login);

route.use(userAuthentication);

route.get('/usuario', getUserDetails);
route.put('/usuario', validateBodyRequisition(schemaUsers), updateUserData);

route.post(
  '/produto',
  validateBodyRequisition(schemaProducts),
  registerProduct
);
route.put(
  '/produto/:id',
  validateBodyRequisition(schemaProducts),
  updateProductData
);
route.get('/produto', listProducts);
route.get('/produto/:id', productInformation);
route.delete('/produto/:id', deleteProduct);

route.post(
  '/cliente',
  validateBodyRequisition(schemaCustomers),
  registerCustomer
);
route.put(
  '/cliente/:id',
  validateBodyRequisition(schemaCustomers),
  editCustomerData
);
route.get('/cliente', listCustomers);
route.get('/cliente/:id', getCustomerDetails);

module.exports = route;
