const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingList");

router.get(
  "/getshoppinglistinfo",
  shoppingListController.fetchShoppingListByUserId
);

router.post("/shoppingList", shoppingListController.addShoppingLList);

module.exports = router;
