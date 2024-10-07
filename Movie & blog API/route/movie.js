const express = require("express");
const route = express.Router();
const movieModel = require("../model/movie");
const { createData, readData, readOneData, updateData, deleteData } = require("../controller/movie");
const authSession = require("../middleware/auth")

route.post("/create",authSession, createData);

route.get("/read", authSession, readData);

route.get("/readOne/:id",authSession, readOneData);

route.put("/update/:id",authSession, updateData);

route.delete("/delete/:id",authSession, deleteData)

module.exports = route;