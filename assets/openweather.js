
const APIKEY = "00694f614e85cadc41bdafc7b80e0569";
const APIURL = `https://api.openweathermap.org/data/2.5/weather`;
let cityName = "Berlin";

const locationTimeField = document.getElementById("locationTime");
const locationNameField = document.getElementById("locationName");
const tempCField = document.getElementById("tempC");
const humidityField = document.getElementById("humidity");
const pressureField = document.getElementById("pressure");

const weatherIconField = document.getElementById("weatherIcon");
const weatherTextField = document.getElementById("weatherText");
const windSpeedField = document.getElementById("windSpeed");
const windDirectionField = document.getElementById("windDirection");

const skyField = document.getElementById("sky");
const sunsetField = document.getElementById("sunset");
const sunriseField = document.getElementById("sunrise");
const coordsField = document.getElementById("coords");
const lastUpdateField = document.getElementById("lastUpdate");

const searchBar = document.getElementById("searchLocation");
const searchBtn = document.getElementById("searchBtn");

const BeaufortSkala = (value) => {
        if(value >= 0 && value <= 0.2)
            return "Windstille bei "+value+"m/s [0]";
        if(value >= 0.3 && value <= 1.5)
            return "Leiser Zug bei "+value+"m/s [1]";
        if(value >= 1.6 && value <= 3.3)
            return "Leichte Brise bei "+value+"m/s [2]";
        if(value >= 3.4 && value <= 5.4)
            return "Schwacher Wind bei "+value+"m/s [3]";
        if(value >= 5.5 && value <= 7.9)
            return "mäßige Brise, mäßiger Wind "+value+"m/s [4]";
        if(value >= 8.0 && value <= 10.7)
            return "frische Brise, frischer Wind "+value+"m/s [5]";
        if(value >= 10.8 && value <= 13.8)
            return "starker Wind "+value+"m/s [6]";
        if(value >= 13.9 && value <= 17.1)
            return "steifer Wind "+value+"m/s [7]";
        if(value >= 17.2 && value <= 20.7)
            return "stürmischer Wind "+value+"m/s [8]";
        if(value >= 20.8 && value <= 24.4)
            return "Sturm "+value+"m/s [9]";
        if(value >= 24.5 && value <= 28.4)
            return "schwerer Sturm "+value+"m/s [10]";
        if(value >= 28.5 && value <= 32.6)
            return "orkanartiger Sturm "+value+"m/s [11]";
        if(value >= 32.7)
            return "Orkan "+value+"m/s [12]";
}


const DirectionDeg = (deg) => {
    if(deg >= 20 && deg <= 69.99)
        return "North East["+deg+"°]";
    if(deg >= 70 && deg <= 109.99)
        return "East ["+deg+"°]";
    if(deg >= 110 && deg <= 159.99)
        return "South East ["+deg+"°]";
    if(deg >= 160 && deg <= 199.99)
        return "South ["+deg+"°]";
    if(deg >= 200 && deg <= 249.99)
        return "South West ["+deg+"°]";
    if(deg >= 250 && deg <= 289.99)
        return "West ["+deg+"°]";
    if(deg >= 290 && deg <= 339.99)
        return "North West ["+deg+"°]";
    if(deg >= 340)
        return "North ["+deg+"°]";
    if(deg <= 19.99)
        return "North ["+deg+"°]";
}


const getNewLocation = () => {
   let url = `?q=${cityName}&appid=${APIKEY}&units=metric`

    fetch(APIURL+url)
    .then ((res) => res.json())
    .then ((data) => {
        console.log(data);
    
        let actTemp = data.main.temp;
        let actHumidity = data.main.humidity;
        let actPressure = data.main.pressure;
        let cityName = data.name;
        let countryLetter = data.sys.country;
        let sky = data.weather[0].description;
        let sunrise = new Date(data.sys.sunrise * 1000).getHours() + ":" + new Date(data.sys.sunrise * 1000).getMinutes();
        let sunset = new Date(data.sys.sunset * 1000).getHours() + ":" + new Date(data.sys.sunset * 1000).getMinutes();
    
        const shiftInSeconds = data.timezone;
        const berlinTime = new Date();
        const berlinOffset = berlinTime.getTimezoneOffset() * 60;
        const utcTime = new Date();
        utcTime.setSeconds(utcTime.getSeconds() + shiftInSeconds + berlinOffset);
    
        locationNameField.innerHTML = cityName+", "+countryLetter;
        pressureField.innerHTML = "Druck: "+actPressure + " hpa"
        locationTimeField.innerHTML = utcTime;
        humidityField.innerHTML = "RLF: <span id='bluespan'>"+actHumidity+"%</span>";
        tempCField.innerHTML = "TEMP: <span>"+actTemp+"°C</span>";
        skyField.innerHTML = sky;
        windSpeedField.innerHTML = BeaufortSkala(data.wind.speed);
        windDirectionField.innerHTML = "Windrichtung: "+DirectionDeg(data.wind.deg);
        coordsField.innerHTML = "COORDS: ["+data.coord.lat+", "+data.coord.lon+"]";
        sunriseField.innerHTML = "Sunrise: "+sunrise;
        sunsetField.innerHTML = "Sunset: "+sunset;
        lastUpdateField.innerHTML = "<span>LAST UPDATE: </span>"+ new Date(data.dt * 1000);

        weatherIconField.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    })
    .catch((error) => {
      //  console.log(error);
    })
}


getNewLocation();

const changeLocation = () => {
    cityName = searchBar.value;
    getNewLocation();
}

searchBtn.addEventListener("click", changeLocation);