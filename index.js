const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/shopApp')
	.then(() => console.log('Mongo Connection established!'))
	.catch((err) => console.log(`Mongo Connection Error: ${err}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dogs', (req, res) => {
  res.send('WOOF!');
})

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
})