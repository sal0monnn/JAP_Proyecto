
const catRoutes = require('./cats.js');
const productsRoutes = require('./cat_producto.js');
const productInfoRoutes = require('./product_info.js');
const commentRoutes = require('./comment_routes.js');
const publishRoute  = require('./publish.js')
const buyRoute      = require('./buy_route.js')
const cartInfoRoute = require('./cart_info_route.js')

const appRouter = (app, fs) => {
  catRoutes(app, fs);
  productsRoutes(app, fs);
  productInfoRoutes(app,fs);
  commentRoutes(app,fs);
  publishRoute(app,fs);
  buyRoute(app,fs);
  cartInfoRoute(app,fs);

};

module.exports = appRouter;
