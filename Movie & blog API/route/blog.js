const express = require("express");
const route = express.Router();
const { createBlog, getBlog, readOneBlog, deleteBlog } = require("../controller/blog");
const authSession = require("../middleware/auth");
const upload = require("../middleware/uploadImg");
const { readOneData } = require("../controller/movie");


route.post("/create", authSession, upload.single("photo"), createBlog);
route.get("/getalldata",authSession, getBlog);
route.get("/getone/:id",authSession, readOneBlog);
// route.put("/update/:id", updateBlog);
route.delete("/delete/:id",authSession, deleteBlog)

module.exports = route;