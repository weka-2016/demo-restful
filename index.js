var express = require('express')
var hbs = require('express-handlebars')
var bodyParser = require('body-parser')
var path = require('path')

var userRecords = require('./db/users')

var app = express()

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded())


app.get('/users', function(req, res) {
  res.render('users', { users: userRecords })
})

app.get('/users/:id', function(req, res) {
  console.log('id', req.params.id)
  var id = req.params.id

  res.render('user', { user: userRecords[id] })
})

app.get('/users/new', function(req, res) {
  res.render('user_new')
})

app.post('/users', function(req, res) {
  var newUser = req.body

  userRecords.push(newUser)

  res.redirect('/users')
})




var PORT = 3000
app.listen(PORT, () => { console.log('running on port ', PORT)  })

