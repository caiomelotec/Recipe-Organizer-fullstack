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
  const selectUserQuery = "SELECT * FROM users WHERE email = ?";

  // Execute the database query using the provided email from the request body
  db.query(selectUserQuery, [req.body.email], (err, data) => {
    if (err) {
      // Handle a database error by returning a 500 Internal Server Error response
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      // If no user is found with the provided email, return a 404 Not Found response
      return res.status(404).json("Benutzer nicht gefunden!");
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) {
      // If the password is incorrect, return a 400 Bad Request response
      return res.status(400).json("Falsche E-Mail oder falsches Passwort");
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign({ id: data[0].id }, process.env.JWTKEY);

    // Remove the 'password' field from the user data (other fields can be included)
    const { password, ...other } = data[0];

    // Set a cookie with the JWT and return a 200 OK response with the user data
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Der Benutzer wurde ausgeloggt");
};
