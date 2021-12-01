console.log('CLient site javascript file')

fetchWeather = ( (input,func) => {
    
    fetch(`http://localhost:3000/weather?address=`+input).then((response) => {

      response.json().then((data) => {
          if(data.error){
              return func(data.error,undefined)
          }
          else 
          {

              const weather =  `Weather is ${data.weather.weather_description}. Current temprature is ${data.weather.current_temprature} but it feels like ${data.weather.feelslike}`;
             
              console.log(weather);
               
              return func(undefined,{
                  location : data.location,
                  weather :  weather});
          }
      })
    })
})


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = searchElement.value;
    
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetchWeather( input ,func = (error,{location,weather} = {} ) => {

        if(error)
        {
            message1.textContent = error;
        }
        else 
        {
            message1.textContent = location;
            message2.textContent = weather;
        }
    });

})

