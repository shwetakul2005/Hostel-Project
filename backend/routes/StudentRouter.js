const { nightoutForm, markAbsenteeInMess, orderFromMess, viewMenu, viewApplication } = require('../controllers/StudentController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.post('/night-out', ensureAuthenticated, checkRole('student'), nightoutForm);
// router.post('/mark-absentee', ensureAuthenticated, checkRole('student'), markAbsenteeInMess);
router.post('/order-from-mess', ensureAuthenticated, checkRole('student'), orderFromMess);
router.get('/view-application/:id', ensureAuthenticated, checkRole('student'), viewApplication );



module.exports=router;