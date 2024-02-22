const userController=require('../controllers/user.controllers');
const{userValidation}=require('../middleware/validation/user.validation')
const express=require('express')
const router =express.Router()



router.post('/signup/:id',userValidation,userController.signUp)
router.post('/signin',userController.signIn)
router.get('/verify/:token',userController.emailVerify);

module.exports=router
