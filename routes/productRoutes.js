
const express = require('express');
const { addProduct, getProdByFirm, deleteProduct } = require('../controllers/productController');



const router = express.Router();

router.post('/add/:id',addProduct);
router.get('/get/:id',getProdByFirm);
router.delete('/delete/:id',deleteProduct);


router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

module.exports = router 