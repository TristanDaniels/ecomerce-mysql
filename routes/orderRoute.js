const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
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
    user_id,
    amount,
    full_name,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `INSERT INTO orders (user_id, amount, full_name, shipping_address, order_email, order_date, order_status) values ('${user_id}','${amount}','${full_name}','${shipping_address}','${order_email}','${order_date}','${order_status}'`,
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
router.delete("/orders/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM orders WHERE order_id=${req.params.id}`,

      (err, result) => {
        if (err) throw err;
        res.send("order successfully deleted");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
