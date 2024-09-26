const express = require('express')
const dotenv = require('dotenv')
const mongoose=require('mongoose')

const bodyparser = require('body-parser')

const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require("cors");
const path = require('path')

const app=express();

const port = process.env.PORT || 4000

dotenv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`Database is connected successfully`);
}).catch((error)=>{
    console.log(`Some issue while connecting to database`);
})

app.use(bodyparser.json())

app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);

app.use('/uploads',express.static('uploads'));

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome</h1>")
})