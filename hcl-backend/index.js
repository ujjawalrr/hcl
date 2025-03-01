const express = require("express");
const mongoose = require("mongoose");
const { connectMongoDB } = require("./connection");
const transactionRoutes = require("./routes/transactionRoutes")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const PORT = 3000;

//mongodb connection
connectMongoDB(process.env.MONGO).
    then(() => {
        console.log(`MongoDb Connected`);
    }).
    catch((err) => {
        console.log("Mongo Error", err);
    })

//middleware
app.use(express.json());

app.use('/api/transaction', transactionRoutes)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
