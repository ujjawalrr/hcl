const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    toBIC: {
        type: String,
        required: true,
    },
    toAccount: {
        type: String,
        required: true,
    },
    fromBIC: {
        type: String,
        required: true,
    },
    fromAccount: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    charge: {
        type: Number,
        required: true,
    },
    timeTaken: {
        type: Number,
        required: true,
    },
    remainingBalance: {
        type: Number,
        required: true,
    },
    path: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
}, {timestamps: true});

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;