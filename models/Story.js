const mongoose = require('mongoose')


const StorySchema = new mongoose.Schema({
   
 title: {
     type:String,
     required:true,
     trim:true
 },
 body:{
   type:String,
   required:true
 },
 status:{
   type:String,
   default:'public',
   enum:['public', 'private'],
   required:true,
 }, 
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  require:true
 }
},{timestamps:true});


module.exports = mongoose.model('Story', StorySchema)