const express= require('express')
const {isAuth, isNotAuth} = require('../middleware/authVerif')
const router = express.Router()
const Story = require('../models/Story')
//@route GET /login
router.get('/',isNotAuth, (req, res) => {
   res.render('login', {layout:'login'})
})

//@route GET /dashboard
router.get('/dashboard',isAuth, async (req, res)=>{
   try{
      //the lean function would convert the document object to plain 
      //javascript object without the save methods and other mongoose features
      //==> array of objects
      let stories= await Story.find({user:req.user.id}).lean()
      res.render('dashboard',{name:req.user.firstName, stories})

   }catch(err){
      console.error(err)
      res.render('errors/505')
   }
})

module.exports=router