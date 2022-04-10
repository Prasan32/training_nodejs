const mysql=require('mysql2')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_training'
})

con.connect((error)=>{
   if(error) throw error
   console.log("Database connected successfully...")
})

module.exports=con