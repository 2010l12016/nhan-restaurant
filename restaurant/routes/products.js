const express = require('express')
const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'./uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
})

const fileFilter = (req,file,cb) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true);
  }else{
    cb(new Error('File not supported'),false);
    
  }
}

const upload = multer({storage: storage, fileFilter: fileFilter});


let Product = require('../models/product.model');

//get the products

router.get('/',async(req,res)=>{
  
    try{
      const products = await Product.find();
      res.json(products);
    }catch(err){
      res.json({message:err});
    }
  })

//add products

router.post('/add',upload.single('productImage'),async(req,res)=>{
  console.log(req.file);
    const newProduct = new Product({
        productName: req.body.productName,
        price_gross: Number(req.body.price_gross),
        vat: Number(req.body.vat),
        price_net: Number(req.body.price_net),
        total_stock: Number(req.body.total_stock),
        productImage: req.file.path,
      });

      try{
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
      }catch(err){
          res.json({message:err});
      }
})


// find specific products
router.get('/:id',async(req,res)=>{
    try{
      const productById = await Product.findById(req.params.id);
      res.json(productById);
    }catch(err){
      res.json({message:err});
    }
  })
  
  
  //delete specific products
  router.delete('/:id',async (req,res)=>{
    try{
      const deleteProduct = await Product.remove({_id:req.params.id});
      res.json(deleteProduct);
    }catch(err){
      res.json({message:err})
    }
  })
  
  //update products
//   router.patch('/:id',async(req,res)=>{
//     try{
//       const updatedPost = await Exercise.updateOne({_id:req.params.id},{$set:{username:req.body.username,description:req.body.description}});
//       res.json(updatedPost);
//     }catch(err){
//       res.json({message:err})
//     }
    
//   })
  

module.exports = router;