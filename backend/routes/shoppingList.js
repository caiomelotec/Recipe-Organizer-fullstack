const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingList");

router.post("/shoppingList", shoppingListController.addShoppingLList);

module.exports = router;
