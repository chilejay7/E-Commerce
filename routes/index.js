const router = require('express').Router();

// This specifies the /api route used by all paths in the application.  The router exports from the main index.js file in the api dircotry are imported here.
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// This is custom middleware that will respond with the h1 heading if an unsupported route is used.
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// This exports all routes previously imoprted from the api directory and set in this file.  These are imported by the main server.js file.
module.exports = router;