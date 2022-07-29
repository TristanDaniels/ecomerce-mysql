const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM order_details", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { order_id, product_id, price, sku, quantity } = req.body;
  try {
    con.query(
      `INSERT INTO order_details (order_id, product_id, price, sku, quantity) values ('${order_id}','${product_id}','${price}', '${sku}', '${quantity}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Edit
router.patch("/:id", (req, res) => {
  const { order_id, product_id, price, sku, quantity } = req.body;
  try {
    con.query(
      `UPDATE order_details set order_id = "${order_id}", product_id = "${product_id}", price = "${price}", sku = "${sku}", quantity = "${quantity}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete by id
router.delete("/order_details/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM order_details WHERE order_detail_id=${req.params.id}`,

      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
