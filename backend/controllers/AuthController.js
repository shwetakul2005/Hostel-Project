//to handle the actual signup flow
const UserModel=require("../models/User");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const signup = async (req,res)=>{
    try {
        console.log(req.body);  
        const {name, username, email, mobile, password, role} = req.body;
        const user=await UserModel.findOne({email});
        
        if(user){//only checks the email
            return res.status(409).json({message: 'User already exists, go to login', success: false});//conflict
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            username,
            email,
            mobile,
            password: hashedPassword, // Save the hashed password
            role
        });
        await newUser.save();
        res.status(201).json({ //created
            message:'Signup successful',
            success:true
        })
        
    } catch (error) {
        console.error("Signup Error:", error); 
        console.log("Errorrr", error);
        res.status(500).json({ //Internal Server Error
            message:'Internal Server Error',
            success:false
        })        
    }
}

const login = async (req,res)=>{
    try {
        // console.log(req.body);  
        const {username, password} = req.body;
        const user=await UserModel.findOne({username: username.toLowerCase()});
        if(!user){
            return res.status(401).json({message: 'User doesn\'t exist, please signup.', success: false});//unauthorized
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(403).json({ message: 'Invalid username or password', success: false });//forbidden
        }
        const payload={
            id: user._id,
            username: user.username,
            role: user.role          
        }
        const jwtToken=jwt.sign( //so that the user doesn't need to prove their identity on every request
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(200).json({ //OK
            message:'Login Successful',
            success:true,
            jwtToken,
            username,
            name:user.name,
            role:user.role
        })
        
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ //Internal Server Error
            message:'Internal Server Error',
            success:false
        })        
    }
}

module.exports={
    signup,login
}