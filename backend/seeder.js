const mongoose = require("mongoose");
const Product = require("./model/productModel.js");
const dotenv = require("dotenv");
const connectdb = require("./db.js");
const products = require("./data/products.js");

dotenv.config();
connectdb();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d'){
    destroyData();
}
else {
    importData();
}