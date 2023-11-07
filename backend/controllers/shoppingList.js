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
