require("dotenv").config();
const express = require("express");
const routes = require("./routes/routers");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.SQL_PORT;

app.listen(port || 3000);
