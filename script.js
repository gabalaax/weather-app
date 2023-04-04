const apikey = "89ec761584c6324cf302e7a7a9d588b6";
window.addEventListener('load' , () => {
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition ((position) => {
        // console.log(position);
        const long=position.coords.longitude;
        const lati=position.coords.latitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apikey}`
        fetch(url).then( res => {
            return res.json()
        }) .then ((data) => {
            console.log(data);
            weatherReport(data);
        })

    })
}})

function weatherReport(data){
    const urlCst = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`
    fetch(urlCst).then(res => {
        return res.json()
    }).then((forecast) => {
        console.log(forecast);
        hourF(forecast);
        dayforcast(forecast)
        document.getElementById ("city").innerText=data.name+" , "+data.sys.country
        document.getElementById("temperature").innerText = Math.floor(data.main.temp - 273) +" °C "
        document.getElementById("clouds").innerText=data.weather[0].description
        let icon = data.weather[0].icon
        let iconUrl = "https://api.openweathermap.org/img/w/" + icon + ".png"
        document.getElementById("img").src = iconUrl


    })
}

function hourF(forecast){
    document.querySelector(".templist").textContent=" "
    for(let i=0 ;i<5; i++){
        let date = new Date(forecast.list[i].dt*1000)
        let hourD=document.createElement("div")
        hourD.setAttribute("class" ,"next")

        let div=document.createElement("div")
    
        let time=document.createElement("p")
        time.setAttribute("class","time")
        time.textContent=(date.toLocaleTimeString(undefined, "Somalia/Mogadishu")).replace(":00" ," ")
        let temp=document.createElement("p")
        temp.textContent=Math.floor(forecast.list[i].main.temp_max-273) + "°C" + " / " + Math.floor(forecast.list[i].main.temp_max-273) + "°C"
        
        div.appendChild(time)
        div.appendChild(temp)
        
        let desc=document.createElement("p")
        desc.setAttribute("class", "desc")
        desc.textContent= forecast.list[i].weather[0].description
        
        hourD.appendChild(div)
        hourD.appendChild(desc)

        document.querySelector(".templist").appendChild(hourD)

    }

}


function dayforcast(forecast){
document.querySelector(".week-forecast").textContent= " "

for(let i = 0 ; i < forecast.list.length; i+=8){
    console.log(forecast.list[i])

    let div = document.createElement("div")
    div.setAttribute("class", "dayF")
    let day = document.createElement("p")
    day.setAttribute("class","date" )
    day.textContent = new Date(forecast.list[i].dt*1000).toDateString(undefined, "Burnsville/US")
    div.appendChild(day)

    let tempt = document.createElement("p")
    tempt.textContent = Math.floor(forecast.list[i].main.temp_max-273) + "°C" + " / " + Math.floor(forecast.list[i].main.temp_max-273) + "°C"
    div.appendChild(tempt)
    
    
    let desc = document.createElement("p")
    desc.setAttribute("class", "description")
    desc.textContent= forecast.list[i].weather[0].description
    div.appendChild(desc)
    document.querySelector(".week-forecast").appendChild(div)
}
}