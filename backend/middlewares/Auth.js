const jwt = require('jsonwebtoken');
const ensureAuthenticated= (req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message:'Unauthorized, JWT token is required'}); //Unautorized
    }
    try{
        const decoded=jwt.verify(auth, process.env.JWT_SECRET);
        req.user=decoded; //very imp-Allows us to prevent database calls about the user at several levels
        next();
    }catch(err){
        res.status(400).json({ message: 'Invalid token, wrong or expired', success: false }); //Bad request
    }
}

const checkRole = (roles) => { // whenever a particular route is hit with this auth validation, list of allowed roles are passed 
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { //checks if the user is allowed to hit that particular route
            return res.status(403).json({ // 403 Forbidden
                message: 'Access denied. You do not have permission for this action.',
                success: false
            });
        }
        
        next();
    };
};

module.exports={
    ensureAuthenticated,
    checkRole
}