const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { connectDb } = require("./db");
const { registerRouter } = require("./Router/RegisterRouter");

app.use("/register", registerRouter);

app.listen(port, async () => {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
  }

  console.log("Connected to port", port);
});
