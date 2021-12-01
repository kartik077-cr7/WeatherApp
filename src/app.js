const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast')
const hbs = require('hbs')

const app = express()

//define path for express config
console.log(__dirname)
const publicDirectoryFolder =  path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryFolder));

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Kartik'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About Me",
        name:"Kartik"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:"Need some help",
        title:'Help',
        name:'Kartik '
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide address",
        })
    }

    geocode(req.query.address,func = (error,{latitude,longitude,location} = {}) => {
      
        if(error)
            return res.send({
                error: error,
            })


   
       forcast(latitude,longitude,(error,forecastData) => {
           
           if(error)
            return res.send({
                error: error,
            })
           
            res.send({
                location:location,
                weather:forecastData,
                address: req.query.address
            })
       })
   
      })
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
       error:"Help article not found"
    })
})

app.get('*',(req,res) => {
     res.render('error',{
         error:"Page Nou Found 404"
     })
})


app.listen(3000,()=>{
    console.log('Server is up on 3000')
})