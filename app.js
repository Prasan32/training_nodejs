// importing express framework and creating app object of express
const express=require('express');
const app=express();
const exphbs=require('express-handlebars')
const routes=require('./routes/routes')

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

// routes here 
app.use(routes)


//server configuration
app.listen(3000,(error,result)=>{
    if(error) throw error
    console.log('Server is listening at PORT: 3000')
})

