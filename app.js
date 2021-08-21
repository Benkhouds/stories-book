const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const mainRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const storiesRoutes = require('./routes/stories')
const passport= require('passport')
const session = require("express-session");
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

//Load config 
dotenv.config({path:'./config/config.env'})
//passport config
require('./services/passport')
//db connection
const clientP = connectDB()
//express instance 
console.log(process.env.GOOGLE_CLIENT_ID)
const app = express()
app.use(express.urlencoded({extended:false}))
//method override
app.use(methodOverride('_method'))
//view engine
const {formatDate, truncate, stripTags,ifEquals,editIcon,actionIcons,cleanString} =require('./helpers/helpers')
app.engine('.hbs', exphbs(
 {
     helpers:{
      formatDate,
      truncate,
      stripTags,
      ifEquals ,
      editIcon,
      actionIcons ,
      cleanString
     },
     defaultLayout:'main', 
     extname:'.hbs'
  }));
app.set('view engine', '.hbs');
//sessions
app.use(session({
 secret: "secret",
 resave: false,
 saveUninitialized: false,
 store: MongoStore.create({clientPromise:clientP})
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//public folder middleware
app.use(express.static(__dirname +'/public'))
//Main Routes
app.use('/', mainRoutes)
//authentication Routes
app.use('/auth', authRoutes)
//stories routes
app.use('/stories', storiesRoutes)
//404

app.use((req, res)=>{
  res.status(404).render('errors/404')
})
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, console.log(`listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))



