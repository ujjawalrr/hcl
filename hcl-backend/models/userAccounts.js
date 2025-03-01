const mongoose = require("mongoose");

const userAccountSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        min: [1000000000, 'Account number must be at least 10 digits']
    },
    BIC: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 1000,
        min: [0, 'Balance cannot be negative']
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const userAccount = mongoose.model("userAccount", userAccountSchema);
module.exports = userAccount;