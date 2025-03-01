const express = require("express");
const router = express.Router();
const userAccount = require("../models/userAccounts");
const bank = require("../models/banks");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { customerName, accountNumber, BIC, balance, password } = req.body;
    
    if (!customerName || !accountNumber || !BIC || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (accountNumber.toString().length < 10) {
        return res.status(400).json({ message: "Account number must be at least 10 digits" });
    }

    if (balance < 0) {
        return res.status(400).json({ message: "Balance cannot be negative" });
    }

    try {
        const bankExists = await bank.findOne({ BIC });
        if (!bankExists) {
            return res.status(400).json({ message: "Invalid BIC code" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userAccount.create({ 
            customerName, 
            accountNumber, 
            BIC, 
            balance, 
            password: hashedPassword 
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Account number or BIC already exists" 
            });
        }
        res.status(500).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { accountNumber, password } = req.body;
    
    try {
        const user = await userAccount.findOne({ accountNumber });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid account number or password" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid account number or password" });
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
