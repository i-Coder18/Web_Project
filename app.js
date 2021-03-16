// api id = http://www.omdbapi.com/?i=tt3896198&apikey=71521f23

const express = require('express');
const request = require('request')
const app = express();
const dotenv=require('dotenv')
dotenv.config()
app.set("view engine", 'ejs')

app.get('/', (req, res) => {
    res.render('homepage')
    // res.send("hi")
})
app.get('/result', (req, res) => {
    console.log(req.query.MovieName)
    // res.send(`searched for ${req.query.MovieName}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.MovieName}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("result",{movieData: data, search: req.query.MovieName})

        } else {
            res.send("Error")
        }
    })
})

app.get('/result/:id', (req, res) => {
    // res.send(`searched for ${req.query.MovieName}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("knowmore",{data : data})

        } else {
            res.send("Error")
        }
    })
})
app.get("*",(req,res)=>{
    // res.send('Go Back! Illegal request')
    res.render('Illegal')

})
app.listen('3000', () => {
    console.log("server started");
})
