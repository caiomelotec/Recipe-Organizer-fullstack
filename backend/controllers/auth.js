const db = require("../util/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //CHECK EXISTING USER
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";

  db.query(checkUserQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0)
      return res.status(409).json("Email Already Registered");

    const queryInsert =
      "INSERT INTO users (`firstname`, `lastname`, `email`, `password`) VALUES (?)";
    //Hash the password and create a user
    bcrypt.hash(password, 10, (err, hashPassword) => {
      if (err) return res.status(500).json("Error hashing the password");

      const values = [firstname, lastname, email, hashPassword];

      db.query(queryInsert, values, (err, results) => {
        if (err) return res.status(500).json("Error by creating a new user");

        res.status(200).json("User has been created");
      });
    });
  });
};
