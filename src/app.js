const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//INDEX
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Helder Ferreira'
    })

})


//ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Helder Ferreira'
    })

})


//HELP  
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Helder Ferreira'
    })

})

//Wheather  
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send( {error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Helder Ferreira',
        errorMessage: 'help artigo not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Helder Ferreira',
        errorMessage: 'Page not found.'

    })

})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")

})

