const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingList");

router.get(
  "/getshoppinglistinfo",
  shoppingListController.fetchShoppingListByUserId
);

router.post("/shoppingList", shoppingListController.addShoppingLList);

router.delete(
  "/deleteshoppinglistbyid",
  shoppingListController.deleteShoppingListItemById
);

module.exports = router;
