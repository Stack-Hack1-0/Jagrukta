const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    data:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('news',newsSchema);