const { orderFromMess } = require('../controllers/StudentController');
const { leaveApproval, viewApplications} = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();


router.patch('/leave-approval/:id/status', ensureAuthenticated, checkRole('warden'), leaveApproval);
router.get('/view-applications', ensureAuthenticated, checkRole('warden'), viewApplications );
module.exports=router;