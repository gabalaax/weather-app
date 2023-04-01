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
        })
    })
}})
