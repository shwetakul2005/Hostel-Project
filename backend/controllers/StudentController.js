
const nightoutForm= (req,res)=>{
    console.log('Form filled by user:', req.user);
    res.status(200).json({ 
            message:`Night-out form for user ${req.user.username} submitted!`,
            success:true
        })
}
const markAbsenteeInMess=(req,res)=>{
    res.status(200).json({ 
            message:'Absentee marked successfully',
            success:true
        })
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
    viewMenu
}