const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { customerName, accountNumber, BIC, balance, password } = req.body;
});
