const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  try {
    con.query(
      `INSERT INTO products (sku, name, price, weight, descriptions, thumbnail, image, category) values ('${sku}',
      '${name}',
      '${price}',
      '${weight}',
      '${descriptions}',
      '${thumbnail}',
      '${image}',
      '${category}'
      '${create_date}'
      '${stock}')`,

      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Delete by id
router.delete("/products/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM products WHERE product_id=${req.params.id}`,

      (err, result) => {
        if (err) throw err;
        res.send("product successfully deleted");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
