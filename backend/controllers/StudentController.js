const ApplicationModel = require("../models/Application");

const nightoutForm = async(req,res)=>{
    try{
        console.log('Form filled by user:', req.user.username);
        const {mis, fromDate, toDate, parentName, parentMobile, room, address}=req.body;
        const studentID=req.user.id;
        const status='Pending';
        const wardenRemark="";
        const newApplication = new ApplicationModel({
                    studentID,
                    mis,
                    fromDate,
                    toDate,
                    parentName,
                    parentMobile,
                    room,
                    address,
                    status,
                    wardenRemark
                });
        console.log("Announcement created");
        await newApplication.save();
        res.status(200).json({ 
                message:`Night-out form for user ${req.user.username} submitted!`,
                success:true
            })
    }
    catch(error){
        console.error("Could not create Announcement:", error); 
        console.log("Error", error);
        res.status(500).json({ //Internal Server Error
            message:'Internal Server Error',
            success:false
        })           
    }    
}
const markAbsenteeInMess=(req,res)=>{
    res.status(200).json({ 
            message:'Absentee marked successfully',
            success:true
        })
}

const viewApplication=(req,res)=>{
    try{
        res.status(200).json({
            message:"Application viewed successfully.",
            success:true
        })
    }
    catch(err){
        res.status(500).json({
            message:"Could not view application. Internal Server Error.",
            success:false
        })
    }
}

const orderFromMess = async (req, res) => {
    res.json({ 
        message: `User ${req.user.username} (Role: ${req.user.role}) ordered from mess.`, 
        success: true 
    });
};

const viewMenu=(req,res)=>{
    try {
        res.status(200).json({
            message:'Menu viewed successfully.',
            success:true,
            menu:[]
        })
            
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            message:'Could not retrieve data',
            success:false
        })            
    }

}

module.exports={
    nightoutForm,
    markAbsenteeInMess,
    orderFromMess,
    viewMenu,
    viewApplication
}