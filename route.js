var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var sleep = require('sleep')

var auth = false

// localhost/login
router.get('/login', function(req, res) {
    // Login page
    auth = false
    res.render('index')     // Render ./views/index.pug
})

router.get('/homepage', function(req, res) {
    if(auth === true) {
        res.render('home')
    }
    else {
        res.redirect(403, '/login')
    }
})

router.post('/verify', function(req, res) {
    // Verify credentials with DB
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'devansh',
        password: 'kanha0812',
        database: 'PROJECT'
    })

    con.connect(function(err) {
        if(err) throw err

        console.log('Connected to PROJECT database')

        var sql = 'SELECT Password FROM User WHERE User_ID = ' + mysql.escape(req.body.username)
        con.query(sql, function(err, result) {
            if(err) throw err

            console.log(typeof(result[0].Password))
            console.log(typeof(String(req.body.password)))

            var reqPass = String(req.body.password)
            var resPass = result[0].Password

            if(resPass === reqPass) {
                console.log('True')
                auth = true

                //res.write('Credentials verified... Redirecting to homepage...')
                sleep.sleep(2)
                res.redirect('/homepage')
            }
            else {
                console.log('False')

                //res.write('Credentials invalid... Redirecting to login...')
                sleep.sleep(2)
                res.redirect(302, '/login')
            }
        })
    })
})

module.exports = router
