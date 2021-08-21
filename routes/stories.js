const express= require('express')
const router = express.Router()
const {isAuth} = require('../middleware/authVerif')
const Story = require('../models/Story')


//@desc  add story page
//@route GET /stories/add
router.get('/add',isAuth, (req, res) => {
 res.render('stories/add')
})
//@desc post story 
//@route POST /stories/add
router.post('/add', isAuth , async (req, res)=>{
 try{
  const story= req.body;
  story.user=req.user._id
  const result = await Story.create(story)
  if (result){
   res.redirect('/dashboard')
  }else{
   res.render('errors/500')
  }

 }catch(err){
  console.error(err)
  res.status(500).render('errors/500')
 }
})
//@desc get public stories
//@route GET /stories
router.get('/',isAuth, async (req,res)=>{
 try{
     const stories = await Story.find({status:'public'})
                                .populate('user')
                                .sort({createdAt:'desc'})
                                .lean()
     res.render('stories/index',{stories,loggedUser:req.user._id})
   }
   catch(err){
     console.error(err)
     res.status(500).render('errors/500')
   }
})
//@desc get Single story
//@rout GET /stories/id
router.get('/:id', async (req, res)=>{
    try{
      const story = await Story.findById(req.params.id)
                                .populate('user')
                                .lean()
      console.log(story)
      if(story){
           res.render('stories/story',{story,loggedUser:req.user._id})
      }else{
         res.status(404).render('errors/404')
      }
    }
    catch(err){
       console.error(err)
       res.status(500).render('errors/500')
    }
})
//@desc get user stories
//@rout GET /stories/user/id
router.get('/user/:id', async (req, res)=>{
   try{
     const stories = await Story.find({user:req.params.id,status:'public'})
                               .populate('user')
                               .lean()
     if(stories){
          res.render('stories/userStories', {stories, name:stories[0].user.firstName,loggedUser:req.user._id})
     }else{
        res.status(404).render('errors/404')
     }
   }
   catch(err){
      console.error(err)
      res.status(500).render('errors/500')
   }
})
//
//@desc get edit story page
//@route GET /stories/edit/id
router.get('/edit/:id',isAuth,  async(req,res)=>{
 try{ 
    const story= await Story.findById(req.params.id).lean()
    if(!story){
     res.status(404).redirect('errors/404')
    }
    if(story.user.toString()==req.user._id.toString()){
       res.render('stories/edit',{story})
    }else{
      res.status(301).redirect('/dashboard')
    }
 }
 catch(err){
    console.error(err)
    res.status(500).render('errors/500')
 }
})
//@desc edit story route
//@route PUT /stories/edit/id
router.put('/edit/:id',isAuth, async (req,res)=>{
 try{
     const story = await Story.findOneAndUpdate({_id:req.params.id},req.body,{runValidators:true})
     if(story){
      res.redirect('/dashboard')
     }else{
       res.status(404).render('errors/404')
     }
  }
 catch(err){
  console.error(err)
  res.status(500).render('errors/500')
 }
})
//@desc delete story route
//@route DELETE /stories/delete/id
router.delete('/delete/:id',isAuth, async (req, res)=>{
  try{
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if(deleted){
       res.redirect('/dashboard')
    }else{
       res.status(404).render('errors/404')
    }
  }catch(err){
     console.error(err)
     res.status(500).render('errors/500')
  }

})
module.exports= router

