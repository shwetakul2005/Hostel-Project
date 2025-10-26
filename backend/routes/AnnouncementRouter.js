const { viewAnnouncements, addAnnouncements, AnnouncementLogs, changeStatus } = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');
const { announcementVal } = require('../middlewares/AuthValidation');

const router=require('express').Router();

router.get('/view-announcements', ensureAuthenticated, checkRole(['mess','student','warden']), viewAnnouncements);
router.post('/add-announcements', ensureAuthenticated, checkRole('warden'), announcementVal, addAnnouncements);
router.get('/announcement-logs', ensureAuthenticated, checkRole('warden'), AnnouncementLogs);
router.patch('/change-status/:id/status', ensureAuthenticated, checkRole('warden'), changeStatus);

module.exports=router;