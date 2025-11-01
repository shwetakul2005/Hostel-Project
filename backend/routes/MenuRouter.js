const { updateMenu } = require('../controllers/MessController');
const { viewMenu } = require('../controllers/StudentController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.post('/add-item', ensureAuthenticated, checkRole('mess'), );
router.get('/view-menu', ensureAuthenticated, checkRole(['mess','student','warden']), viewMenu);

// router.get('/get-menu', ensureAuthenticated, checkRole(['warden', 'student']), getMenu);
// router.get('/place-order', ensureAuthenticated, checkRole(['warden', 'student']), placeOrder);

module.exports=router;