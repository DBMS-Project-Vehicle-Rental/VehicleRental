var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var route = require('./route.js')   // Express routing

app.use(bodyParser.urlencoded({extended: true}))    // Settings for routing
app.use('/', route)

app.set('view engine', 'pug')
app.set('views', './views')     // Pug files

app.listen(3000)
