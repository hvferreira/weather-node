const request = require("request")


const forecast = (latitude, longitude, callback) => {

    //for celcius ?units=si
    //for language &lang=pt
    // //key=value&otherKey=otherValue
    const url = 'https://api.darksky.net/forecast/e650a7aaf08956d2ec30a9e80ae721fc/' + latitude + ',' + longitude + '?units=si&lang=pt'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined)

        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + ' Degress out. This high today is '+ body.daily.data[0].temperatureHigh +' with a low of '+body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast