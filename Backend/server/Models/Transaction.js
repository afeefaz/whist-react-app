const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    products: Object,
    date : Date,
    total : Number
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction