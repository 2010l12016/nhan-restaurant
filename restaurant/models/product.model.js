const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    price_gross: { type: Currency, required: true },
    vat: {type: Number,required: true },
    price_net: { type: Number, required: true },
    total_stock: { type: Number, required: true },
    productImage: {type: String, required: true}
  },
{
    timestamps: true,
});

const Product = mongoose.model('product',productSchema);

module.exports = Product;