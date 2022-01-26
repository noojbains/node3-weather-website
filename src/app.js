const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //getting handlebars setup
app.set('views', viewsPath)//customizing express to pull from templates folder instead of default 'views' folder
hbs.registerPartials(partialsPath)//configure hbs partials 

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nooji Baby'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nooji Baby'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Help message. Error occurred.',
        title: 'Help',
        name: 'Nooji Baby'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                    return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
              })
            })
        }
    })

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//help related 404s
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nooji Baby',
        errorMessage: 'Help article not found'
    })
})

//Generic 404 handler
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nooji Baby',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

