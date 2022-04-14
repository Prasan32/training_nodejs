const con = require("../database/connection");

exports.home = (req, res) => {
  res.render("home", { title: "HOME" });
};

exports.about = (req, res) => {
  res.render("about", { title: "ABOUT" });
};

exports.blog = (req, res) => {
  //using connection object to fetch the data from the post table
  con.query("SELECT * FROM post", (error, results) => {
    if (error) throw error;
    results.map((post) => {
      post.description = post.description.substring(0, 200) + "...";
      let date = new Date(post.created_at);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      post.created_at = year + "-" + (month + 1) + "-" + day;
    });
    res.render("blog", { results: results, title: "BLOG" });
  });
};

exports.login = (req, res) => {
  res.render("login");
};

exports.register = (req, res) => {
  res.render("register");
};

exports.postDetail = (req, res) => {
  let id = req.params.id;
  con.query("SELECT * FROM post WHERE id=?", id, (error, result) => {
    if (error) throw error;
    let date = new Date(result[0].created_at);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    result[0].created_at = year + "-" + (month + 1) + "-" + day;
    res.render("postDetail", { post: result[0] });
  });
};

exports.createPost = (req, res) => {
  res.render("createPost", { title: "NEW POST" });
};

exports.savePost = (req, res) => {
  //destructuring request body
  const { title, description, author } = req.body;

  //making our object ready to be saved in the database
  const post = {
    title: title,
    description: description,
    image: req.file.filename,
    author: author,
  };

  //saving the post object in database using connection object
  con.query("INSERT INTO post SET ?", post, (error, result) => {
    if (error) {
      con.rollback();
      throw error;
    }
    res.redirect("/blog");
  });
};

exports.edit = (req, res) => {
  let id = req.params.id;
  con.query("SELECT * FROM post WHERE id=?", id, (error, result) => {
    if (error) throw error;
    res.render("edit",{post:result[0]});
  });
};

exports.delete = (req, res) => {
    let id=req.params.id
    
    con.query('DELETE FROM post WHERE id=?',id,(error,result)=>{
        if(error) throw error
        res.redirect('/blog')
    })  
};

exports.update=(req,res)=>{
    const {title,description,author}=req.body
    let id=req.params.id
    
    con.query('UPDATE post SET title=?,description=?,image=?,author=? WHERE id=?',[title,description,req.file.filename,author,id],(error,result)=>{
        if(error) {
            con.rollback()
            throw error
        }
        res.redirect('/blog')
    })
}
