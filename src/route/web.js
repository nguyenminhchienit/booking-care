import express from "express";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req,res) => {
        res.send("Home page");
    })
    return app.use("/",router)
}

module.exports = initWebRoutes;