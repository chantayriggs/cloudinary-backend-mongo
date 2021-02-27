require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require("./routes/image");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(URI, {
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
