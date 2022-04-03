const express=require('express')
const router=express.Router()
const controllers=require('../controllers/controllers')

//routes here
router.get('/',controllers.home)

router.get('/about',controllers.about)

router.get('/blog',controllers.blog)

router.get('/login',controllers.login)

module.exports=router