const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    BIC: {
        type: String,
        unique: true,
        index: true,
    },
    charge: {
        type: Number,
        required: true,
    },
    
});


const bank = mongoose.model("bank", bankSchema);
module.exports = bank;