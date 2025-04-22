const express = require("express");
const app = express();
const parser = require("body-parser");
const adminRouter = require("../routes/admin");
const userRouter = require("../routes/user");
const port = 3000;

app.use(parser.json());

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});