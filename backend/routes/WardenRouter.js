const { orderFromMess } = require('../controllers/StudentController');
const { leaveApproval} = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();


router.post('/leave-approval', ensureAuthenticated, checkRole('warden'), leaveApproval);
router.post('/order-from-mess', ensureAuthenticated, checkRole('warden'), orderFromMess );//common function present in StudentController.js

module.exports=router;