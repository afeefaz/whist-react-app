const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../Models/Product')
const Transaction = require('../Models/Transaction')

mongoose.connect('mongodb://localhost/Whist', { useNewUrlParser: true, useUnifiedTopology: true })

router.get('/products', function(req, res) {
  Product.find({}, function(err, products) {
    res.send(products)
  })
})

router.get('/transactions', function(req, res) {
  Transaction.find({}, function(err, transactions) {
    res.send(transactions)
  })
})

router.get('/transactions', function(req, res) {
  Transaction.find({}, function(err, transactions) {
    res.send(transactions)
  })
})

router.get('/products/:id', function(req, res) {
  Product.find({_id : req.params.id}, function(err, product) {
    res.send(product)
  })
})

router.post('/products', function(req, res){
  let prod = new Product({
    Title : req.body.Title,
    Price : req.body.Price,
    Descreption : req.body.Descreption,
    Image : req.body.Image})
  prod.save()

  res.send('Added')
})

router.post('/transactions', function(req, res) {
  let transaction = new Transaction({products : req.body, date : Date.now(), total : req.body.total})
  transaction.save()
})

router.delete('/products/:id', function(req, res) {
  Product.find({_id : req.params.id}, function(err, product) {
    if(err){
      console.log('error')
      res.send('Error')
    }else {
      Product.deleteOne({_id:req.params.id}).then(function(){
        console.log("Data deleted")
        res.send('Deleted')
    })
    }
  })
})

router.put('/products/:id', function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) {
      console.log("errorrrrrrrrrrrrrrrrrrrrr")
      res.send('Error')
    }
    else {
      product.Title = req.body.Title
      product.Price = req.body.Price
      product.Descreption = req.body.Descreption
      product.Image = req.body.Image

      product.save()
      res.send('Updated')
    }
  })
})

module.exports = router;