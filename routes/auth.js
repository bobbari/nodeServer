// create route
const router = require('express').Router();
const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 // salt
const saltRounds = 10;


// import userRegisterValidation 
const {userRegisterValidation} = require('../validations/userValidations');

router.post('/register',async (req,resp)=>{
    const {name,email, password, date} = req.body;
    // salt with async
    const salt = await bcrypt.genSalt(saltRounds);
    // hashing the password
    const hashPassword =  await bcrypt.hash(password,salt);
    const User = new userModel({ name, email, password:hashPassword, date,role:1})
    const {error} = userRegisterValidation(req.body);
    if(error){
            resp.status(400).json({ message: error.details[0].message}).send();
    }else{
         try {
            // if the email already exists before inserting
            const emailExist = await userModel.findOne({"email":email});
            if (!emailExist) {
                const userData =  await User.save()
               resp.status(200).json({ message: 'user created successfully ', data: userData._id }).send();
            }else{
                resp.status(400).json({ message: 'Email already exists'}).send();
            }
        } catch (error) {
            console.log(error)  
            resp.status(403).json({ message: error}).send();
        }
    }   
})
router.post('/login',async(req,resp)=>{
    const {email,password }= req.body
    // salt with async
    const salt = await bcrypt.genSalt(saltRounds);
    // hashing the password
    const existingDetails = await userModel.findOne({email:email})
    if(existingDetails){
        // email exist so compare password
        const comparePassword = await bcrypt.compare(password, existingDetails.password)
        if (comparePassword) {
            // password match setting the jwt token
            var privateKey = process.env.PRIVATE_KEY;
            const token = jwt.sign({
            data: {userid:existingDetails._id,userRole:existingDetails.role}
            }, privateKey, { expiresIn: '1h' });
            resp.status(200).header({"auth-token":token}).json({message:'User logged successfully'}).send();
        }else{
            resp.status(400).json({message:'email or password  is invalid'}).send();
        }
    }else{
        resp.status(400).json({message:"email or password is invalid"}).send();
    }
    
    
})
module.exports = router