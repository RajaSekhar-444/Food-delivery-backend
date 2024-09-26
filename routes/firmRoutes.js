const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { addFirm, deleteFirm } = require('../controllers/firmController');


const router = express.Router();

router.post('/add-firm',verifyToken,addFirm);
router.delete('/delete/:id',verifyToken,deleteFirm);


router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

module.exports = router;