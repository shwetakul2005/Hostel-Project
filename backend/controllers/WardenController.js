
const addAnnouncements= (req,res)=>{
    res.status(200).json({ 
            message:'Announcement submitted!',
            success:true
        })
}
const leaveApproval=(req,res)=>{
    res.status(200).json({ 
            message:'Leave approved.',
            success:true
        })
}

const viewAnnouncements=async (req,res)=>{
    try{
        res.status(200).json({
            message:'Announcements viewed successfully.',
            success:true,
            announcements:[]
        })

    }
    catch(error){
        res.status(500).json({
            message:'Could not retrieve announcements. Internal Server Error',
            success:false,
        })
    }
}

//orderFromMess function is present in StudentController.js already
module.exports={
    addAnnouncements,
    leaveApproval,
    viewAnnouncements
}