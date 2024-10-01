const express = require("express");
const route = express.Router();
const movieModel = require("../model/movie");


route.post("/create", async (req, res) => {
    try {
        let { fullname, director, cast, genres, language, rating } = req.body;
        let findMovie = await movieModel.findOne({ fullname });
        if (findMovie) {
            res.status(409).json({
                msg: "Movie alredy exist"
            })
        } else {
            let movie = await movieModel.create({
                fullname, director, cast, genres, language, rating
            });
            res.status(201).json(movie);
        }
    } catch (error) {
        res.send(error.message)
    }
});

route.get("/read", async (req, res) => {
    try {
        let allData = await movieModel.find();
        res.send(allData);
    } catch (error) {
        res.send(error.message);
    }
});

route.get("/readOne/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await movieModel.findById(id);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.put("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let movie = await movieModel.findOne({ _id: id });
        if (!movie) {
            return res.status(400).send("Movie not found");
        }
        let { fullname, director, cast, genres, language, rating } = req.body;
        let data = await movieModel.findByIdAndUpdate(id, { fullname, director, cast, genres, language, rating });
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let movie = await movieModel.findOne({ _id: id });
        if (!movie) {
            return res.status(400).send("Movie not found");
        }
        let deleteMovie = await movieModel.findByIdAndDelete(id);
        console.log(deleteMovie);
        res.send("movie deleted");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = route;