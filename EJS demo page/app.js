const express = require("express");
const app = express();
const path = require("path")
const port = 8000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{ 
    res.render("about");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.listen(port,()=>{
    console.log(`server is http://localhost:${port}`)
    
})