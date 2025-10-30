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

const announcementVal = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(150).required().messages({
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must be less than 150 characters'
        }),
        content: Joi.string().trim().min(10).required().messages({
            'string.min': 'Content must be at least 10 characters long'
        }),
        expiryDate: Joi.date().optional().allow(null),
        status: Joi.string().valid('online', 'offline').optional()//not neccessary but okay to keep it in
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const applicationVal=(req,res,next)=>{
    const schema = Joi.object({
        
        mis: Joi.string().trim().pattern(new RegExp(/^\d{9}$/)).required().messages({
                'string.pattern.base': 'Please enter a valid 9-digit MIS number',
            }),

        fromDate: Joi.date().iso().min('now').required().messages({
                'date.min': 'Start date must be today or a future date',
            }),

        toDate: Joi.date().iso().greater(Joi.ref('fromDate')).required().messages(),

        parentName: Joi.string().trim().min(2).required().messages(),

        parentMobile: Joi.string().trim().pattern(new RegExp(/^[6-9]\d{9}$/)).required().messages({
                'string.pattern.base': 'Please enter a valid 10-digit mobile number'
            }),

        room: Joi.string().trim().min(2).required().messages(),

        address: Joi.string().trim().min(10).required().messages({
                'string.min': 'Address must be at least 10 characters long'
            })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        // Send back the first error message
        return res.status(400).json({ 
            message: error.details[0].message,
            error: error, // Send the full error object for debugging
            success: false 
        });
    }
    
    next();
}

module.exports={
    signupVal,
    loginVal,
    announcementVal,
    applicationVal
}