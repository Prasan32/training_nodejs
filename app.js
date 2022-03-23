// importing express framework and creating app object of express
const express=require('express');
const app=express();
const exphbs=require('express-handlebars')

//setting up templating engine
app.set('view engine','handlebars')
app.engine('handlebars',exphbs.engine())

//setting up public directory
app.use(express.static('public'))

// routes here 
app.get('/',(req,res)=>{
    res.render('home') 
})


//server configuration
app.listen(3000,(error,result)=>{
    if(error) throw error
    console.log('Server is listening at PORT: 3000')
})

