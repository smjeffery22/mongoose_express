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

// show all products
app.get('/products', async (req, res) => {
	const products = await Product.find({});

	res.render('products/index', { products });
});

app.listen(3000, () => {
	console.log('LISTENING ON PORT 3000!');
});
