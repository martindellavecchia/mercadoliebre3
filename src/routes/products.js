
// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require ("path")

//configuracion de multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/products")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/',upload.any(), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', upload.any(), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/detail/:id', productsController.destroy); 
 

module.exports = router;
