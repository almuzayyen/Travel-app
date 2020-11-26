 
 const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const fetch = require ("node-fetch");
const dotenv = require('dotenv');

const app = express();
 
 app.use(cors())
 dotenv.config({ path: './config.env' });

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const key = process.env.KEY;
const userName=  process.env.USERNAME

const pickey =  process.env.PICKEY

 let dataSet= []
 
 
 const getData =  async (req, res, next) => {
    
     let city = req.body.city;
     let date= req.body.date
     console.log(city)
let url=`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${userName}`;
    
let response =  await fetch(url,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSet),
    //body: JSON.stringify(dataSet),
})
let data = await response.json()
let lat =  data.geonames[0].lat
let lng = data.geonames[0].lng
 let countryName = data.geonames[0].countryName

dataSet.push({
    lat:lat,
    lng:lng,
    countryName:countryName
})
    

   next();
};

  const getTemp =  async (req, res, next) =>{
      const lan = parseInt( dataSet[dataSet.length - 1].lat)
      const lng = parseInt (dataSet[dataSet.length - 1].lng)
     
      console.log(lan)
      console.log(lng)
      let url =  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lan}.0&lon=${lng}&threshold=63&units=M&key=${key}`
      
      let response =  await fetch(url,{
   method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSet),
    
})
let resData = await response.json();
   
    let temp = resData.data[0].temp
    dataSet.push({
        temp:temp
    })
    
   next();
 }

 const getPic = async (req, res, next ) =>{

const picName = req.body.city
      let url =  `https://pixabay.com/api/?key=${pickey}&q=${picName}&image_type=photo`
      let response =  await fetch(url,{
   method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataSet),
    //body: JSON.stringify(dataSet),
})
let picData = await response.json();

console.log(picData.hits[0].largeImageURL)
let pic = picData.hits[0].largeImageURL;

dataSet.push({
        pic:pic,
        
    })
    
    res.status(200).json({
    status: 'success',
     dataSet});
  
    next();
    
 }


 module.exports = {getData,getTemp, getPic}