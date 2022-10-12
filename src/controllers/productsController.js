const fs = require('fs');
const path = require('path');
const app = require('../app');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products})
	},

	

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProd = req.params.id
		let prodObj = products.find(producto => producto.id == idProd )
		res.render("detail", {prodObj});
		
	},

	
	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	
	},
	
	
	// Create -  Method to store
	store: (req, res) => {
		let imagenCargada

		if(req.files[0] != undefined){
			imagenCargada = req.files[0].originalname
		} else {
			imagenCargada = "default-image.png"
		}

		let newProduct = {
			id: products.length+1,
			...req.body,
			image : imagenCargada
		}
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
		res.redirect("/")
		
	},



	// Update - Form to edit
	edit: (req, res) => {
		idProducto =req.params.id;
		let prodObj = products.find(producto => idProducto == producto.id)
		res.render("product-edit-form", {prodObj})
	},



	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let prodObj = products.find(producto => idProducto == producto.id)
		
		
		let imagenCargada
		if (req.files[0] != undefined){
			imagenCargada = req.files[0].originalname
		} else{
			imagenCargada = "default.image.png"
		}
		
		let nuevoProd = {
			id : prodObj.id,
			...req.body,
			image: imagenCargada
		}

		let newArrayProducts = products.map(producto => {
			if(producto.id == nuevoProd.id){
				producto = {...nuevoProd}	
			}
			return producto
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(newArrayProducts, null, " "))
		console.log(req.files)
		res.redirect("/")
	},

		

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		console.log(req.params.id)
		let productosFinal = products.filter(producto => producto.id != req.params.id)
		fs.writeFileSync(productsFilePath, JSON.stringify(productosFinal, null, " "))
		res.redirect("/")
	}


}; 

module.exports = controller; 