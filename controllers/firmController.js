const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Path2D.extname(file.originalname));
    }
});

const upload = multer({storage:storage})

const addFirm = async(req,res)=>{
    try{
    const {firmName,area,category,region,offer} = req.body;

    const image = req.file? req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId);

    if(!vendor){
        res.status(404).json({error:"Vendor not found"});
    }

    const firm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor: vendor._id
    })
    
    const savedFirm=await firm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();

    console.log(`Firm added successfully`);

    return res.status(200).json({message:"Firm added successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error"
        })

    }
}

const deleteFirm = async(req,res)=>{
    try{
        const firmId = req.params.id;
        const deletedFirm = await Product.findByIdAndDelete(productId);

        if(!deletedFirm){
            return res.statius(404).json({error:"No product found"});
        }
        res.status(200).json({"message":"Product Deleted",deletedFirm});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Interval Server Error",error});
    }
}

module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirm}