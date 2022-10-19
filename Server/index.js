const express = require("express");
const cors = require("cors");
const db = require("./db");
const users = require("./Model/userSchema");
const authRoute = require("./Routes/users.auth.routes")
const BMIroutes = require("./Routes/Bmi.auth.routes")
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/calculate", BMIroutes)


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await db;
    console.log("connected to db successfully");
  } catch {
    console.log("something went wrong while connecting to db");
  }
  console.log(`listening on port http://localhost:${PORT}/`);
});

