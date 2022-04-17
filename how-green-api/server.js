const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// parse cookies
app.use(cookieParser())

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Routing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to How Green API." });
});

const authRoutes = require("./app/routes/auth.routes");
const projectRoutes = require("./app/routes/project.routes");

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
// require("./app/routes/project.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
