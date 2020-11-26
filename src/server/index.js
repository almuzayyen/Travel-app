const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const app = express();
const fetch = require ("node-fetch");
const fetchApi = require('./fetchApi')

app.use(cors())

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());




/* Middleware*/

   app.get('/',(req, res,next )=>{
    
    
    
next()
   });
app.post('/getdata', fetchApi.getData, fetchApi.getTemp, fetchApi.getPic  )


   app.post('/test',(req, res)=>{
      res.status(200).json({
    status: 'success',
     });
      
   });
  
// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app runing on port ${port}`);
});
app.use(express.static('dist'));
module.exports = app;