module.exports={
  
 isAuth: (req,res, next)=>{
     if(req.isAuthenticated()){
        return next()
     }else{
       res.redirect('/')
     }
 },
 isNotAuth: (req,res, next)=>{
     if(!req.isAuthenticated()){
        next()
     }else{
      res.redirect('/dashboard')
     }
 }

}