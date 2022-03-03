const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose
	.connect('mongodb://localhost:27017/farmStand')
	.then(() => console.log('Mongo Connection established!'))
	.catch((err) => console.log(`Mongo Connection Error: ${err}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// add product
app.post('/products', async (req, res) => {
	const newProduct = new Product(req.body);
  await newProduct.save();

  res.redirect('/products')
});

// show all products
app.get('/products', async (req, res) => {
	const products = await Product.find({});

	res.render('products/index', { products });
});

// show add product page
app.get('/products/new', (req, res) => {
	res.render('products/new');
});

// show one specific product
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	res.render('products/show', { product });
});

app.listen(3000, () => {
	console.log('LISTENING ON PORT 3000!');
});
