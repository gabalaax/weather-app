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

        document.getElementById ("city").innerText=data.name+" , "+data.sys.country
        document.getElementById("temperature").innerText = Math.floor(data.main.temp - 273) +" °C "
        document.getElementById("clouds").innerText=data.weather[0].description
        let icon = data.weather[0].icon
        let iconUrl = "https://api.openweathermap.org/img/w/" + icon + ".png"
        document.getElementById("img").src = iconUrl


    })
}
