const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ba581c0a2f442739db9c39d5ddf5748e&query='+ latitude + ',' + longitude +'&units=f'
    
    request({url,json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast