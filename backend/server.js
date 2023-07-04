const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const dotenv = require("dotenv");
const connectdb = require("./db.js");
const mongoose = require("mongoose");
const Product = require("./model/productModel.js");

dotenv.config(); //accessing the .env

connectdb(); //creating db connection with help of mongoose ORM/ODM (similar to sequelize)

const app = express();

// const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

const addProductToDB = (createdProduct) => {
  const newProduct = new Product(createdProduct);
  newProduct.save().then(()=>{
    console.log("product added to DB");
  }).catch((error)=>{
    console.log(error);
  })
};

const getProductsFromDB = async () => {
  try {
    const receivedData = await Product.find();
    console.log("received products collection from DB");
    //console.log(receivedData);
    return receivedData;
    // process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/products", (req, res, next) => {
  const receivedData = getProductsFromDB();
  receivedData.then((data)=> {
    console.log(data);
    res.status(200).json({ products:  data});
  });
});

app.post("/product", (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid title and price.",
    });
  }

  const createdProduct = {
    // id: uuid(),
    title,
    price,
  };

  addProductToDB(createdProduct);
  console.log(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

app.listen(5000);
console.log("started server on port 5000");
