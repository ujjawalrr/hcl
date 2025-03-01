const express = require("express");
const mongoose = require("mongoose");
const { connectMongoDB } = require("./connection");
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth");
dotenv.config()
const app = express();
const PORT = 3000;


connectMongoDB(process.env.MONGO)
    .then(() => {
        console.log(`MongoDB Connected`);
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Mongo Error", err);
        process.exit(1); 
    });

app.use(express.json());

app.use("/api/auth", authRoutes);
