const db = require("../util/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO users(`firstname`, `lastname`,`email`,`password`) VALUES (?)";
    const values = [firstname, lastname, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
