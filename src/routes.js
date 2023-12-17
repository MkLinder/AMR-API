const { Router } = require('express');
const route = Router();
const validateBodyRequisition = require('./middlewares/validateBodyRequisition');
const userAuthentication = require('./middlewares/authentication');
const listCategories = require('./controllers/categories');
const products = require('./controllers/products');
const customers = require('./controllers/customers');
const users = require('./controllers/users');
const schemaUsers = require('./schemas/registerUsers');
const loginSchema = require('./schemas/login');
const schemaProducts = require('./schemas/registerProducts');
const schemaCustomers = require('./schemas/registerCustomer');
const orders = require('./controllers/orders');
const schemaOrders = require('./schemas/registerOrders');
const multer = require('./services/multer');

route.get('/categoria', listCategories);
route.post(
  '/usuario',
  validateBodyRequisition(schemaUsers),
  users.registerUser
);
route.post('/login', validateBodyRequisition(loginSchema), users.login);

route.use(userAuthentication);

route.get('/usuario', users.getUserDetails);
route.put(
  '/usuario',
  validateBodyRequisition(schemaUsers),
  users.updateUserData
);

route.post(
  '/produto',
  multer.single('produto_imagem'),
  validateBodyRequisition(schemaProducts),
  products.registerProduct
);
route.put(
  '/produto/:id',
  multer.single('produto_imagem'),
  validateBodyRequisition(schemaProducts),
  products.updateProductData
);
route.get('/produto', products.listProducts);
route.get('/produto/:id', products.productInformation);
route.delete('/produto/:id', products.deleteProduct);

route.post(
  '/cliente',
  validateBodyRequisition(schemaCustomers),
  customers.registerCustomer
);
route.put(
  '/cliente/:id',
  validateBodyRequisition(schemaCustomers),
  customers.editCustomerData
);
route.get('/cliente', customers.listCustomers);
route.get('/cliente/:id', customers.getCustomerDetails);

route.post(
  '/pedido',
  validateBodyRequisition(schemaOrders),
  orders.registerOrder
);
route.get('/pedido', orders.listOrders);

module.exports = route;
