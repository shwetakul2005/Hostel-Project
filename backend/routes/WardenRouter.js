const { orderFromMess } = require('../controllers/StudentController');
const { leaveApproval, viewApplications} = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();


router.patch('/leave-approval/:id/status', ensureAuthenticated, checkRole('warden'), leaveApproval);
router.post('/order-from-mess', ensureAuthenticated, checkRole('warden'), orderFromMess );//common function present in StudentController.js
router.get('/view-applications', ensureAuthenticated, checkRole('warden'), viewApplications );
module.exports=router;