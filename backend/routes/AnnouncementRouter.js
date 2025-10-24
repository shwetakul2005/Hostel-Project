const { viewAnnouncements, addAnnouncements } = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');

const router=require('express').Router();

router.get('/view-announcements', ensureAuthenticated, checkRole(['mess','student','warden']), viewAnnouncements);
router.post('/add-announcements', ensureAuthenticated, checkRole('warden'), addAnnouncements);
module.exports=router;