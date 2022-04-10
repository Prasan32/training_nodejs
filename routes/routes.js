const express=require('express')
const router=express.Router()
const controllers=require('../controllers/controllers')
const multer=require('multer')

//configuring multer storage engine
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
   filename:(req,file,cb)=>{
       cb(null,Date.now()+"--"+file.originalname)
   }
})

const upload=multer({storage:fileStorageEngine})

//routes here
router.get('/',controllers.home)

router.get('/about',controllers.about)

router.get('/blog',controllers.blog)

router.get('/login',controllers.login)

router.get('/register',controllers.register)

router.get('/postDetail',controllers.postDetail)

router.get('/createPost',controllers.createPost)

router.post('/createPost',upload.single('image'),controllers.savePost)

module.exports=router