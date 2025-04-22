const express = require("express");
const app = express();
const admin = require("../routes/admin");
const adminRouter = require("../routes/admin");

app.use(express.json());

app.use("/admin",adminRouter);

app.listen(3000);