//all necessary imports 
const express = require('express'); 
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcryptjs'); 
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

//this secret will use to sign token 
const JWT_SECRET = 'Harryisagoodb$oy';

//Route 1
//Create a user using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    //validations 
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),

], async (req, res)=>{

    //if there are errors, return bad request and the errors 
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
    //Check whether the user with this email exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }

    // hashing & salting passwords for security 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt) 

    //create a new user
        user = await User.create({
        name: req.body.name, 
        password: secPass,
        email: req.body.email,
    })

    //creating payload data
    const data = {
        user: {
            id : user.id
        }
    }

    //signing jwt token 
    const authToken = jwt.sign(data, JWT_SECRET)

    //sending authtoken as a response 
    res.json({authToken});

    //catch errors
} catch(error) {
    console.error(error.message);
    res.status(500).send("Some Error occured")
}
    
   })

//Route 2
//Authenticate a user using: POST "/api/auth/login". No Login required
router.post('/login',[
    //validations 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
], async (req, res)=>{

    //if there are any errors, return a bad request and error
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //Destructuring request body
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error :"Please try to login with correct credentials"}); 
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error :"Please try to login with correct credentials"}); 
        }
        const payload = {
            user: {
                id : user.id
            }
        }
        //signing jwt token 
        const authToken = jwt.sign(payload, JWT_SECRET)

        //sending authtoken as a response 
        res.json({authToken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 3
//Get loggedin User Details using: POST "api/auth/getuser". Login Required

router.post('/getuser', fetchuser, async (req, res)=>{
    
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//exporting this router for using out of this file
module.exports = router
