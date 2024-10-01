const express = require("express");
const app  = express();
const PORT = 8000;
const route = require("./route/user");
const movieRoute = require("./route/movie");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("test")
});

app.use("/",route);
app.use("/user",movieRoute);

app.listen(PORT,()=>{
    console.log(`server started http://localhost:${PORT}`)
})