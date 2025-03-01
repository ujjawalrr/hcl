const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
    fromBIC: {
        type: String,
        index: true,
    },
    toBIC: {
        type: String,
    },
    timeTaken: {
        type: Number,
        required: true,
    },
    
});


const link = mongoose.model("link", linkSchema);
module.exports = link;