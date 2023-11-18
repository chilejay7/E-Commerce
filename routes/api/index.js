const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// This creates the route prefixes that are defined in each individual file.  The full routes will use /api/<name of route>.
// The main /api prefix is defined in the the index.js file in the root of the routes folder that imports these routes.
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// The index.js file in the directory is what will provide the exports to the index.js file in the root of the routes directory. 
// By default, express looks for an index.js file when importing routes. 
// All routes to be used with the application need to be exported from this file.
module.exports = router;
