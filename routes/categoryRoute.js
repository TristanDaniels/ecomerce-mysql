const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `INSERT INTO categories (name, description, thumbnail) values ('${name}','${description}','${thumbnail}'`,
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
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `UPDATE categories set name = "${name}", description = "${description}", thumbnail = "${thumbnail}"`,
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
router.delete("/categories/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM categories WHERE category_id=${req.params.id}`,

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
