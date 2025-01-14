require ("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;
const connectDB = require("./connectDB");
connectDB();

// require routes
const userRoutes = require("./Module/UserManagement/userRoutes");
const taskRoute = require("./Module/TaskManagement/taskRoute");

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use('/user', userRoutes);
app.use('/task', taskRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });