const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const sequelize = require("./database");
const User = require("./models/userModel");
const Document = require("./models/documentModel");
const Comment = require("./models/commentModel");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", documentRoutes);
app.use("/api/v1", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
