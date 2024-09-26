

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const Vendor = require('../models/Vendor');

dotenv.config();

const vendorRegister = async(req, res) => {
    console.log(`raja`);
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            res.status(400).json({
                "message":"Invalid Email Id or Password"
            })
        }

        const token = jwt.sign({vendorId:vendor._id},process.env.SECRET_KEY,{expiresIn:'1h'});

        console.log(`Log in successful`);
        res.status(200).json({
            "message":"Logged in successfully!",
            "token":token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getVendorById = async(req,res)=>{
    try{
        const vendorId = req.params.id;
        const v = await Vendor.findById(vendorId).populate('firm');
        if(!v){
            return res.status(404).json({error:"Id not found"});
        }
        res.status(200).json({"success":true,v})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById}