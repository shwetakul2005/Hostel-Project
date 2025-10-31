const AnnouncementModel = require("../models/Announcements");
const ApplicationModel = require("../models/Application");
const UserModel = require('../models/User');
const addAnnouncements = async (req,res)=>{
    try {
        const {title, content, expiryDate}=req.body;
        const status='online';
        const author=req.user.id;
        const newAnnouncement = new AnnouncementModel({
                author,
                title,
                content,
                status,
                expiryDate
            });
        console.log("Announcement created");
        await newAnnouncement.save();
        res.status(201).json({ 
            message:'Announcement Created!',
            success:true
        })        
    } catch (error) {
        console.error("Could not create Announcement:", error); 
        console.log("Error", error);
        res.status(500).json({ //Internal Server Error
            message:'Internal Server Error',
            success:false
        })           
    }    
}
const leaveApproval = async(req,res)=>{
    try {
        const {status, wardenRemark} = req.body;
        const {id} = req.params; 
        if (!['Approved', 'Rejected'].includes(status)) 
            {
                return res.status(400).json({ //Bad request
                    message: 'Invalid status.',
                    success: false 
                });
            }
        let application = await ApplicationModel.findById(id);

        if (!application) {
                return res.status(404).json({ //Not found
                    message: 'Application not found for the given id',
                    success: false 
                });
        }

        application.status = status; 
        application.wardenRemark=wardenRemark;
        await application.save();
         res.status(200).json({ 
            message:'Leave approved/rejected successfully.',
            success:true,
            application:application
        });
    } catch (error) {
        console.error("Change Status Error:", error);
        res.status(500).json({
            message:"Internal Server Error. Could not change application status.",
            success:false,
        })        
    }       
}

const viewAnnouncements=async (req,res)=>{//View all online and unexpired announcements *For all
    try{
        const now = new Date();
        let Announcements=await AnnouncementModel.find(
            { "status": "online" , 
        $or: [ //check that the announcement hasn't expired
                { expiryDate: null }, // ok if expiryDate is not set
                { expiryDate: { $gt: now } }]
         } // Or if the expiryDate is present then it is in the future
        ).populate('author', 'name' ).sort({ createdAt: -1 });; //populate only the name field from User
        // console.log(Announcements);

        res.status(200).json({
            message:'Online announcements viewed successfully.',
            success:true,
            announcements:Announcements
        })
    }
    catch(error){
        console.error("View Announcements Error:", error);
        res.status(500).json({
            message:'Could not retrieve announcements. Internal Server Error',
            success:false,
        })
    }
}
const AnnouncementLogs=async (req,res)=>{//view all announcements (online, offline, expired, all) *Only for the warden
    try{
        let Announcement=await AnnouncementModel.find(); //shows all announcements from all wardens to a particualar warden (this is done to avoid the wardens from putting the same annoucement again)

        res.status(200).json({
            message:"All announcements viewed successfully",
            success:true,
            announcements:Announcement
        })        
    }
    catch(error){
        res.status(500).json({
            message:'Could not retrieve announcements. Internal Server Error',
            success:false,
        })
    }
}
const changeStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const {id} = req.params; 
        if (!['online', 'offline'].includes(status)) 
            {
                return res.status(400).json({ //Bad request
                    message: 'Invalid status.',
                    success: false 
                });
            }
        let announcement = await AnnouncementModel.findById(id);

        if (!announcement) {
                return res.status(404).json({ //Not found
                    message: 'Announcement not found for the given id',
                    success: false 
                });
        }

        if (status === 'online') {
            const now = new Date();
            // Check if the post has an expiry date that has already passed
            if (announcement.expiryDate && announcement.expiryDate < now) {
                // If it's expired, we need to set it to 'online' and also clear the expiry date.
                announcement.expiryDate = null;
            }
        }

        announcement.status = status; //mongoose allows us to directly make changes to the announcement object and then it creates a query
        await announcement.save();
        res.status(200).json({
                message: `Status changed successfully to ${status}`,
                success: true,
                announcement: announcement 
            });
    } catch (error) {
        console.error("Change Status Error:", error);
        res.status(500).json({
            message:"Internal Server Error. Could not change status.",
            success:false,
        })        
    }    
}

const deleteAnnouncement = async (req,res)=>{
    try{
        const {id}=req.params;
        const deletedAnn = await AnnouncementModel.findByIdAndDelete(id);
        if (!deletedAnn) {
            return res.status(404).json({
                message:"No Announcement found with that id.",
                success:false
            });
        }
        res.status(200).json({
            message:"Announcement deleted successfully",
            success:true
        });
    }
    catch(err){
        console.error("Could not delete announcement error:", err);
        res.status(500).json({
            message:"Could not delete announcement. Internal server error.",
            success:false
        });  
    }
}

const viewApplications = async(req,res)=>{
    try{
        let Applications=await ApplicationModel.find(
            { "status": "Pending"}).populate('studentID', 'name mobile').sort({ createdAt: -1 });
        // console.log(Applications);
        if(Applications.length==0){
            return res.status(200).json({
                    message:'No applications to review.',
                    success:true,
                    Applications:Applications
            })
        }
        res.status(200).json({
            message:'Pending applications viewed successfully.',
            success:true,
            Applications:Applications
        })
    }
    catch(error){
        console.error("View Announcements Error:", error);
        res.status(500).json({
            message:'Could not retrieve Applicaitons. Internal Server Error',
            success:false,
        })
    }
}

//orderFromMess function is present in StudentController.js already
module.exports={
    addAnnouncements,
    leaveApproval,
    viewAnnouncements,
    AnnouncementLogs,
    changeStatus,
    deleteAnnouncement,
    viewApplications
}