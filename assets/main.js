const APIKEY = "a24bd3f8023544b8867173333232505";
const APIURL = "http://api.weatherapi.com/v1/forecast.json?key=a24bd3f8023544b8867173333232505&q=";
let myLocation = "Berlin";
const locationField = document.getElementById("locationSelect");

const locationTimeField = document.getElementById("locationTime");
const locationNameField = document.getElementById("locationName");
const locationTempCField = document.getElementById("tempC");
const locationHumidityField = document.getElementById("humidity");
const locationWeatherIcon = document.getElementById("weatherIcon")
const locationWeatherText = document.getElementById("weatherText")

const locationTempCField2 = document.getElementById("tempC2");
const locationHumidityField2 = document.getElementById("humidity2");
const locationWeatherIcon2 = document.getElementById("weatherIcon2");
const locationWeatherText2 = document.getElementById("weatherText2");

const searchLocationField = document.getElementById("searchLocation");
const searchBtn = document.getElementById("searchBtn");


const changeLocation = () => {
    fetch(APIURL+myLocation)
    .then((response) => response.json())
    .then((data) => {
        let locationTime = data.location.localtime;
        let locationName = data.location.name;
        let tempC = data.current.temp_c;
        let humidity = data.current.humidity;
        let weatherIcon = data.current.condition.icon;
        let weatherText = data.current.condition.text;
    
        locationTimeField.innerHTML = locationTime;
        locationNameField.innerHTML = locationName;
        locationTempCField.innerHTML = "Aktuelle Temperatur: "+tempC + "°C";
        locationHumidityField.innerHTML = "Luftfeuchtigkeit: "+humidity+"%";
        locationWeatherIcon.setAttribute("src",weatherIcon);
        locationWeatherText.innerHTML = weatherText;
    
        let tempC2 = data.forecast.forecastday[0].day.maxtemp_c;
        let humidity2 = data.forecast.forecastday[0].day.avghumidity;
        let weatherIcon2 = data.forecast.forecastday[0].day.condition.icon;
        let weatherText2 = data.forecast.forecastday[0].day.condition.text;
    
        locationTempCField2.innerHTML = "Max Temperatur Morgen: "+tempC2 + "°C";
        locationHumidityField2.innerHTML = "Durchschn. Luftfeuchtigkeit: "+humidity2+"%";
        locationWeatherIcon2.setAttribute("src",weatherIcon2);
        locationWeatherText2.innerHTML = weatherText2;
    
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    })
}

const setLocation = () => {
    myLocation = searchLocationField.value;
    changeLocation();
}

changeLocation();
searchBtn.addEventListener("click", setLocation);

/*
    https://www.weatherapi.com/my/
*/
