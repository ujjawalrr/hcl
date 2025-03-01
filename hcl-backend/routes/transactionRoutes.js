const express = require("express");
const transaction = require("../models/transactions");
const router = express.Router();

// router.post("/fastestRoute", async (req, res) => {
//     const { accountNumber } = req.params.acNumber;
//     try {
//         const transactions = await transaction.find({fromAccount: accountNumber})
//         return res.status(200).json(transactions)
//     } catch (error) {
//         return res.status(500).json("Internal Server Error")
//     }
// });

// router.post("/cheapestRoute", async (req, res) => {
//     const { accountNumber } = req.params.acNumber;
//     try {
//         const transactions = await transaction.find({fromAccount: accountNumber})
//         return res.status(200).json(transactions)
//     } catch (error) {
//         return res.status(500).json("Internal Server Error")
//     }
// });

router.get("/getTransaction/:acNumber", async (req, res) => {
    const { accountNumber } = req.params.acNumber;
    try {
        const transactions = await transaction.find({fromAccount: accountNumber})
        return res.status(200).json(transactions)
    } catch (error) {
        return res.status(500).json("Internal Server Error")
    }
});

module.exports = router;