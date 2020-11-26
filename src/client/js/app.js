


/* Global Variables */

const city =     document.getElementById('city-id');
const subBut =  document.getElementById("generate");
let pic = document.getElementById("pic");
let country = document.getElementById("country");
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const tempDv = document.getElementById('temp');

const dateInput = document.getElementById('date-id')

//click event Listener
export const grClick  =  () =>{
subBut.addEventListener('click', async (oEvent) =>{
    oEvent.preventDefault()
    let cityName = city.value;
    let date = dateInput.value;
 
 if(cityName != ''){
 let response = await fetch('http://localhost:3000/getdata',{
         method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({city:cityName,date:date})
    })

    let resData = await response.json()
   
    console.log(resData.dataSet.length)
    let pictur = resData.dataSet[resData.dataSet.length -1].pic
    let tempture = resData.dataSet[resData.dataSet.length -2].temp
    let countryName = resData.dataSet[resData.dataSet.length -3].countryName
    console.log(pictur)
    console.log(tempture)
    //console.log(resData)
    tempDv.innerHTML=`<h1> tempture:${tempture}</h1>`
    pic.innerHTML=`<img src=${pictur} alt="not found">`
    country.innerHTML=`<h1>Country Name: ${countryName}</h1>`
}else{
  alert('fild required')
}});
}

