const { error } = require('console');
const { response } = require('express');
const express = require('express')
const app = express()
const port = 2700
const axios = require('axios');


//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render('index');
})

//Views
app.get("/tahun", (req, res) => {
    //GET DATA USING AXIOS
    const query = req.query.search;
    axios.get(`https://date.nager.at/api/v2/publicholidays/${query}/ID`)
        .then(function (response) {
            // handle success
            const jsonData = response.data;
            res.render("tahun", { data: jsonData })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

})

//Port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})