const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} and ${req.url}`
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance underway'
//     })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase()
})
app.get('/',(req, res) => {
    // res.send('<h1>hello express<h1>')
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to Nathan\'s great site, motherfucker!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
})

app.get('/bad', (req, res) => {
    res.status(200).send('Bad!')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on portn 3000')
})