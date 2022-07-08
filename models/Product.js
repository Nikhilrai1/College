import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', Product);