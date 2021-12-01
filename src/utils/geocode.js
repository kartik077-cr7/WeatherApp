const request = require('request')

const geocode = (address,func) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2FydGlrMDc3IiwiYSI6ImNrdXo2M2EyajB1dHoybnFxdmZseGRpM2kifQ.m1FhNCTGzjBmyW56nDZ1Hg&limit=1`

    request({url:url,json:true},(error,response) => {
          
        if(error)
        {
            func('Unable to connect to location services!',undefined);
        }
        else if(response.body.features.length === 0)
        {
            func('Unable to search keyword. Search for other keywords',undefined);
        }
        else
        {
            const latitude = response.body.features[0].center[1];
            const longitude =  response.body.features[0].center[0];
            const location = response.body.features[0].place_name;

            func(undefined,{
                latitude,
                longitude,
                location})
        }
    })
}

module.exports = geocode