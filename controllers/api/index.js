const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/comments', commentRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);


module.exports = router;