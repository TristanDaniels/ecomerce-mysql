const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM product_categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { product_id, category_id } = req.body;
  try {
    con.query(
      `INSERT INTO product_categories (product_id, category_id) values ('${product_id}','${category_id}'`,
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
  const { product_id, category_id } = req.body;
  try {
    con.query(
      `UPDATE product_categories set product_id = "${product_id}", category_id = "${category_id}"`,
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
router.delete("/product_categories/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM product_categories WHERE product_category_id=${req.params.id}`,

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
