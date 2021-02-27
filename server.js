require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require("./routes/image");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://chantay:993961%40Aa@cluster0.bm88x.mongodb.net/cloudinaryImages?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected');
};

connectDB()

app.use(express.json({ extended: false }));
app.use("/", routes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port', PORT));
