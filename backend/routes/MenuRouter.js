const { updateMenu, addMenuItem, changeItemStatus, deleteMenuItem, getBreakfast, getMenuByCategory, getUnavailableItems } = require('../controllers/MessController');
const { viewMenu } = require('../controllers/StudentController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.post('/add-item', ensureAuthenticated, checkRole('mess'), addMenuItem);
router.patch('/:id/change-status', ensureAuthenticated, checkRole('mess'), changeItemStatus );
router.delete('/delete-item/:id', ensureAuthenticated, checkRole('mess'), deleteMenuItem);
// router.get('/get-menu', ensureAuthenticated, checkRole(['warden', 'student']), getMenu);
// router.get('/place-order', ensureAuthenticated, checkRole(['warden', 'student']), placeOrder);


router.get('/:category/get-available-items', ensureAuthenticated, checkRole(['mess','student','warden']), getMenuByCategory);
router.get('/:category/get-unavailable-items', ensureAuthenticated, checkRole(['mess','student','warden']), getUnavailableItems);


module.exports=router;