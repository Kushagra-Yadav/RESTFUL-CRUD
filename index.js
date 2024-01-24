const mongoose=require("mongoose");
const express=require("express");
const bodyParser=require("body-parser");
app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/Sample").then(()=>{
  console.log("Mongo Connected");
}).catch((err)=>{
  console.log(err);
})
const mongooseSchema=new mongoose.Schema({
  name:String,
  description:String,
  price:Number,
 
});
const Product=new mongoose.model("Product",mongooseSchema);
//Create product
app.post("/api/v1/product",async(req,res)=>{
     const product=await Product.create(req.body);
     res.status(201).json({
      success:true,
      product
     })
})

//Get all product
app.get("/api/v1/products",async(req,res)=>{
    const product=await Product.find();
    res.status(200).json({
      success:true,
      product
    })
})

//Get single Product
app.get("/api/v1/product/:id",async(req,res)=>{
  const product=await Product.findById(req.params.id);
  if(!product)
  {
    return res.status(500).json({
      success:false,
      message:"No such product found"
    })
  }
  else{
    res.status(200).json({
      success:true,
      product
    })
  }
  
})

//Update a product
app.put("/api/v1/product/:id",async(req,res)=>{
  let product=await Product.findById(req.params.id);
  if(!product)
  {
    return res.status(500).json({
      success:false,
      message:"No such product found"
    })
  }
   product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
  
  res.status(200).json({
    success:true,
    product
  })
})

//Delete a product
app.delete("/api/v1/product/:id",async(req,res)=>{
  const product=await Product.findById(req.params.id);
  if(!product)
  {
    return res.status(500).json({
      success:false,
      message:"No such product found"
    })
  }
  await product.deleteOne();

  res.status(200).json({
    success:true,
     message:"Product Deleted Successfully"
  })
})

app.listen(4500,()=>{console.log("Server running")});