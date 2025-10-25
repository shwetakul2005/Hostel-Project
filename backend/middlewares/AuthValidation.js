const Joi = require('joi'); //server-side validation middleware
//whenever a post request is made this checks against the following basic rules
const signupVal = (req,res,next)=>{
    // console.log("Entered auth validation.");
    // console.log(req.body);
    const schema=Joi.object({
        name: Joi.string().trim().min(2).required(),
        username: Joi.string().trim().min(3).lowercase().required(),
        email: Joi.string().trim().lowercase().email().required(),
        mobile: Joi.string().trim().regex(/^[6-9]\d{9}$/).required().messages({
            'string.pattern.base': 'Please enter a valid 10-digit mobile number'
        }),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('student', 'mess', 'warden').required()
    });
    const {error}=schema.validate(req.body);
    if(error){ //if the data is invalid, immediately sends an error, before the main controller is even hit
        return res.status(400).json({ message: error.details[0].message })
    }
    // console.log("Val complete");
    next();
}

const loginVal=(req,res,next)=>{
    const schema=Joi.object({
        username: Joi.string().trim().lowercase().required(),
        password: Joi.string().required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }
    next(); 
}
module.exports={
    signupVal,
    loginVal
}