// importing express framework and creating app object of express
const express=require('express');
const app=express();
const exphbs=require('express-handlebars')
const routes=require('./routes/routes')
const session=require('express-session')
const flash=require('connect-flash')

//setting up templating engine
app.set('view engine','handlebars')
app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))

//setting up public directory
app.use(express.static('public'))



//bodyParser config
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//database connection
require('./database/connection')

app.use(session({
    secret:'thisismysecret',
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:600000}
}))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success_message=req.flash('success_message')
    res.locals.error_message=req.flash('error_message')
    next()
})

// routes here 
app.use(routes)

app.use((req,res)=>{
   res.render('404Error',{layout:'pageNotFoundLayout'})
})


//server configuration
app.listen(3000,(error,result)=>{
    if(error) throw error
    console.log('Server is listening at PORT: 3000')
})

