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

// router protection
exports.checkUserIdMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("Access denied: No token provided");
  }
  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, process.env.JWTKEY);

    // Get the user's ID from the decoded JWT payload
    const tokenUserId = decoded.id;

    // Get the requested user's ID from the URL parameters
    const userId = req.params.userId;
    console.log(userId, "user id");
    // Check if the token user's ID matches the requested user's ID
    if (tokenUserId == userId) {
      // If they match, continue to the next middleware or route handler
      next();
    } else {
      // If they don't match, return a 403 Forbidden response
      res.status(403).json("Access denied: User ID does not match token");
    }
  } catch (err) {
    // If the JWT verification fails, return a 401 Unauthorized response
    res.status(401).json("Access denied: Invalid token");
  }
};
