const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  Title: String,
  Price: Number,
  Descreption: String,
  Image : String
})

const Product = mongoose.model('product', productSchema)

module.exports = Product