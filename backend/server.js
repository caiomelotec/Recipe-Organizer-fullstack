const express = require("express");

const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config();
const recipesRouters = require("./routes/recipes");
const authRouters = require("./routes/auth");

app.use(express.json()); // to support JSON-encoded bodies
app.use(cors());

// routes
app.use(recipesRouters);
app.use(authRouters);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
