const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/productsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  color: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);


app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ success: true, product });
});


app.listen(5000, () => console.log('Server running on port 5000'));
