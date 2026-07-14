const Express = require("express");

const app = Express()

app.get("/", (req, res) => res.send(`<h1>Hello </h1>`) )

module.exports = app;