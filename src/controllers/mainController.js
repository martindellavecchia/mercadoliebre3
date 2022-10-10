const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visited = products.filter(producto =>{
			if(producto.category == "visited"){
				return producto;
			}
		});

		let inSale = products.filter(producto =>{
			if(producto.category == "in-sale"){
				return producto;
			}
		
		});

	
	res.render("index", { visited, inSale} )
},

search: (req, res) => {
	let key = req.query.keywords
	resultado = products.filter(producto => {
		return producto.name.toLowerCase().includes(key)
		
	})
	console.log(resultado)
	res.render("results", {resultado:resultado, toThousand})

}
}

	


module.exports = controller;
