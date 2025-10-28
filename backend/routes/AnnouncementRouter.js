const { viewAnnouncements, addAnnouncements, AnnouncementLogs, changeStatus, deleteAnnouncement } = require('../controllers/WardenController');
const { ensureAuthenticated, checkRole } = require('../middlewares/Auth');
const { announcementVal } = require('../middlewares/AuthValidation');

const router=require('express').Router();

router.get('/view-announcements', ensureAuthenticated, checkRole(['mess','student','warden']), viewAnnouncements);
router.post('/add-announcements', ensureAuthenticated, checkRole('warden'), announcementVal, addAnnouncements);
router.get('/announcement-logs', ensureAuthenticated, checkRole('warden'), AnnouncementLogs);
router.patch('/change-status/:id/status', ensureAuthenticated, checkRole('warden'), changeStatus);
router.delete('/announcements/:id', ensureAuthenticated, checkRole('warden'), deleteAnnouncement);

module.exports=router;