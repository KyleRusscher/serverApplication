
// create schema for api inputs
const Joi = require('joi');
// server acces authentication
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();

let controller = require("./controller");

app.use(express.json());

//TODO: add joi schema for validating inputs prior to making request for all http methods
app.get('/', (req, res) => {
    res.send("hello this is from api.js");
})

app.get('/champions', (req, res) => {
    const data = controller.getAllChampionData();
    res.send(data);
})

app.get('/champions/:name', (req, res) => {
    const data = controller.getChampionData(req.params.name) 
    res.send(data);
})

app.post('/create', async (req, res) => {
    let data = await controller.tryToAddAccount(req.headers)
    data.request = req.headers
    res.send(data);   
})

app.post('/login', async (req, res) => {
    let data = await controller.login(req.headers)
    data.request = req.headers
    res.send(data);   
})

app.listen(5000, () => console.log("Server has been started on port 5000"));