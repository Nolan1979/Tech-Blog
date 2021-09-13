const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes')
const api = require('./api')

router.use('/api', api)
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;