const con=require('../database/connection')

exports.home=(req,res)=>{
    res.render('home')
}

exports.about=(req,res)=>{
    res.render('about')
}

exports.blog=(req,res)=>{
    //using connection object to fetch the data from the post table
    con.query('SELECT * FROM post',(error,results)=>{
        console.log(results);
        if(error) throw error
        res.render('blog',{results:results})
    })

    
}

exports.login=(req,res)=>{
    res.render('login')
}

exports.register=(req,res)=>{
    res.render('register')
}

exports.postDetail=(req,res)=>{
    res.render('postDetail')
}

exports.createPost=(req,res)=>{
    res.render('createPost')
}

exports.savePost=(req,res)=>{
    //destructuring request body
    const {title,description,author}=req.body

    //making our object ready to be saved in the database
    const post={
        title:title,
        description:description,
        image:req.file.filename,
        author:author,
    }

    //saving the post object in database using connection object
    con.query('INSERT INTO post SET ?',post,(error,result)=>{
        if(error){
            con.rollback()
            throw error
        }
        res.redirect('/blog')
    })
}