const { nightoutForm, markAbsenteeInMess, orderFromMess, viewMenu, viewApplication } = require('../controllers/StudentController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');
const { applicationVal } = require('../middlewares/AuthValidation');

const router=require('express').Router();

router.post('/night-out', ensureAuthenticated, checkRole('student'), applicationVal, nightoutForm);
// router.post('/mark-absentee', ensureAuthenticated, checkRole('student'), markAbsenteeInMess);
router.get('/view-applications', ensureAuthenticated, checkRole('student'), viewApplication );



module.exports=router;