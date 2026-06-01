const express = require("express");
const router = express.Router();

router.get("/products", async(req,res)=>{

const rows = await db.query(
"SELECT * FROM products"
);

res.json(rows);

});

module.exports = router;
