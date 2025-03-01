const express = require("express");
const router = express();
const banks = require("../models/banks");

router.get("/getBanks", async (req, res) => {
    try {
        const banksData = await banks.find({});
        return res.status(200).json(banksData);
    } catch (error) {
        return res.status(500).json("Internal Server Error")
    }
})

module.exports = router;