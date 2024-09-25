import exp from "constants";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/product.js";
const port = process.env.PORT;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server ruuning on port: ${port}`);
});
