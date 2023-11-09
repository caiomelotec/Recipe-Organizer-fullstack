const db = require("../util/database");
var jwt = require("jsonwebtoken");

exports.addShoppingLList = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json("Not Authorized");

  const recipeName = req.body.requestData.recipeName;
  const ingredients = JSON.stringify(req.body.requestData.ingredientsNames);

  jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
    if (err) return res.status(405).json("Token is not valid");

    const insertQuery =
      "INSERT INTO shoppinglist (ingredients_names, sl_recipe_name, sp_uid) VALUES (?,?,?)";

    db.query(
      insertQuery,
      [ingredients, recipeName, userInfo.id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error inserting shopping list data" });
        }

        return res.status(200).json("Shopping list added successfully");
      }
    );
  });
};

exports.fetchShoppingListByUserId = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json("Not Authorized");

  jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
    if (err) return res.status(405).json("Token is not valid");

    const getQuery = "SELECT * FROM shoppinglist WHERE sp_uid = ?";

    db.query(getQuery, [userInfo.id], (err, data) => {
      if (err)
        return res.status(405).json({ err: "error getting shoppinglist data" });

      // const deserializedData = JSON.parse(data)

      return res.send(data).status(200);
    });
  });
};

exports.deleteShoppingListItemById = (req, res) => {
  const shoppingListId = JSON.parse(req.body.id);

  const deleteQuery = "DELETE from shoppinglist WHERE shoppingList_id = ?";

  db.query(deleteQuery, [shoppingListId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting shopping list" });
    }

    return res
      .status(200)
      .json({ message: "Successfully deleted shopping list" });
  });
};
