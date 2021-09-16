const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require("../utils/toThousand");
const percentage = require("../utils/percentage");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		return res.render('products',{
			products,
			percentage,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// Do the magic
		return res.render('detail', {
			product : products.find(product => product.id === +req.params.id),
			percentage,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name,price,discount,category,description} = req.body;

		let newProduct = {
			id: products[products.length - 1].id + 1,
			name: name.trim(),
			description,
			price: +price,
			discount: +discount,
			image: "default-image.png",
			category
		}

		products.push(newProduct);

		fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json'),JSON.stringify(products,null,3),'utf-8')

		res.redirect('/products/detail/'+newProduct.id)
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		return res.render('product-edit-form',{
			product : products.find(product => product.id === +req.params.id)
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {name,price,discount,category,description} = req.body;

		let product = products.find(product => product.id === +req.params.id)

		let modifiedProduct = {
			id: +req.params.id,
			name: name.trim(),
			description: description,
			price: +price,
			discount: +discount,
			image: product.image,
			category: category
		}

		let modifiedProducts = products.map(product => product.id === +req.params.id ? modifiedProduct : product) 

		fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json'),JSON.stringify(modifiedProducts,null,3),'utf-8')

		res.redirect('/products/detail/'+req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let deleteProduct = products.filter(product => product.id !== +req.params.id);

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(deleteProduct,null,3),'utf-8');

        return res.redirect('/products')
	}
};

module.exports = controller;