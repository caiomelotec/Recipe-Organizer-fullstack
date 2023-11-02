const db = require("../util/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //CHECK EXISTING USER
  const checkQuery = "SELECT * FROM users WHERE email = ?";

  db.query(checkQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email bereits registriert!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery =
      "INSERT INTO users(`firstname`, `lastname`,`email`,`password`) VALUES (?)";
    const values = [firstname, lastname, email, hash];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Der Benutzer wurde erstellt.");
    });
  });
};

exports.login = (req, res) => {
  const { email, pass } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(404).json("User not found");

    // check password
    const isPasswordCorrect = bcrypt.compareSync(pass, data[0].password);

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong Email or Password");

    const token = jwt.sign({ id: data[0].id }, process.env.JWTKEY);
    const { password, ...other } = data[0];

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
