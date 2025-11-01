const { signup, login } = require('../controllers/AuthController');
const { signupVal, loginVal } = require('../middlewares/AuthValidation');

const router=require('express').Router();

router.post('/login', loginVal, login); 
router.post('/signup', signupVal, signup); //login and signup flow called only when the validation check is passed

module.exports=router;
