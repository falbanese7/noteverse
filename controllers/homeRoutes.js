const router = require('express').Router();
const withAuth = require('../utils/auth');
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  withAuth,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
