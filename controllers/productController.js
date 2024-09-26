
const Firm = require('../models/Firm');
const Product = require('../models/Product')

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

const addProduct = async(req,res)=>{

    const {productName,price,category,bestseller,description}=req.body;
    const image = req.file? req.file.filename:undefined

    try{
        const firmId = req.params.id;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"Firm not found"});
        }
        const newProduct = new Product({
            productName,price,category,bestseller,description,image,firm:firm._id 
        })

        const savedProduct = await newProduct.save();
;
        firm.product.push(savedProduct)

        await firm.save();

        return res.status(200).json({message:"Product added successfully",savedProduct});

    }catch(error){
        console.log(error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}



const getProdByFirm = async(req,res)=>{
    try{
        const firmId = req.params.id
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"Firm not found"});
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({firm:firmId});
        res.status(200).json({"success":"true",restaurantName,products});
    }catch(error){
        console.log(error);
        res.status(400).json({"messsage":"Internal Server Error",error})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.statius(404).json({error:"No product found"});
        }
        res.status(200).json({"message":"Product Deleted",deletedProduct});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Interval Server Error",error});
    }
}


module.exports = {addProduct:[upload.single('image'),addProduct],getProdByFirm,deleteProduct};