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
		let newProduct = req.body
		console.log(newProduct)
		res.redirect("/")
		
	},



	// Update - Form to edit
	edit: (req, res) => {
		idProducto =req.params.id;
		prodObj = products.find(producto => idProducto == producto.id)
		res.render("product-edit-form", {prodObj})
	},



	// Update - Method to update
	update: (req, res) => {
		let updatedProd = req.body;
		console.log(updatedProd)
		res.redirect("/")
	},

		

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		console.log(req.params.id)
		res.redirect("/")
	}


}; 

module.exports = controller; 