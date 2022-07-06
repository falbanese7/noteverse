const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/user', userRoutes);
router.use('/bookmark', bookmarkRoutes);
router.use('/tag', tagRoutes);

module.exports = router;
