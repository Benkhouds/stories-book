const express= require('express')
const router = express.Router()
const passport = require('passport')
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard')
  });
 router.get('/logout',(req, res)=>{
    req.logout()
    res.redirect('/')
 })
module.exports=router