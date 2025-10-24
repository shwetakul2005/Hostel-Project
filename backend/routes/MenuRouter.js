const { updateMenu } = require('../controllers/MessController');
const { viewMenu } = require('../controllers/StudentController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.post('/update-menu', ensureAuthenticated, checkRole('mess'), updateMenu);
router.get('/view-menu', ensureAuthenticated, checkRole(['mess','student','warden']), viewMenu);

module.exports=router;