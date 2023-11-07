const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config();
const recipesRouters = require("./routes/recipes");
const authRouters = require("./routes/auth");
const userRouters = require("./routes/users");
const shoppingListRouters = require("./routes/shoppingList");
const cookieParser = require("cookie-parser");

app.use(express.json()); // to support JSON-encoded bodies
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

// routes
app.use(recipesRouters);
app.use(authRouters);
app.use(userRouters);
app.use(shoppingListRouters);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
