const request = require('request')

forcast = (latitude,longitude,func) => {
   
    const url = `http://api.weatherstack.com/current?access_key=90b60d9e553235c8066d59ae8e979e28&query=${latitude},${longitude}`

    request({url:url,json:true},(error,response) => {
        
        if(error)
        {
            func("Unable to connect to weather services!",undefined)
        }
        else if(response.body.error)
        {
            func("unable to find location",undefined)
        }
        else 
        {
            func(undefined,{
                weather_description: response.body.current.weather_descriptions[0],
                current_temprature: response.body.current.temperature,
                feelslike: response.body.current.feelslike })
        }
    })
}


module.exports = forcast