const { updateMenu, viewAbsentees, viewOrders } = require('../controllers/MessController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.get('/view-absentees', ensureAuthenticated, checkRole('mess'), viewAbsentees);




module.exports=router;




