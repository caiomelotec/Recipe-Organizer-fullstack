const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const recipesRouters = require("./routes/recipes");
const authRouters = require("./routes/auth");
const userRouters = require("./routes/users");
const shoppingListRouters = require("./routes/shoppingList");
const cookieParser = require("cookie-parser");

app.use(express.json()); // to support JSON-encoded bodies
// Add this before your routes

app.use(
  cors({
    origin: "https://koch-by-caio-melo.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "token",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// routes
app.use(recipesRouters);
app.use(authRouters);
app.use(userRouters);
app.use(shoppingListRouters);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
