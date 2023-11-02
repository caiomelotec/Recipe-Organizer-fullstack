const db = require("../util/database");
const jwt = require("jsonwebtoken");

exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  console.log("Requested user ID: ", userId);

  const userQuery =
    "SELECT id, firstname, lastname, email, img FROM users WHERE users.id = ?";
  db.query(userQuery, [userId], (err, userData) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching user by id data", details: err });
    }

    console.log("User data retrieved: ", userData);

    if (userData.length === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(userData[0]);
  });
};
