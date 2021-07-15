
//see displayWeather() for more possible constructors to put here,
//depending how we structure our program overall.

//later used to store info returned by API
const weather = {};
// API Key
const key = "549d95480b954727bd5f2ff0a254e8b7";

//need a place to input zipcode (box or whatever) - then call getWeather(zip), with zip being the zipcode

// get weather from API
function getWeather(zip){
    let api = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zip}&units=I&key=${key}`;
    
    fetch(api)
        .then(function(response){
            let info = response.json();
            
            return info;
        })
        //the response is a list of lists. There is presumably an easier way to do this than the following for loop, but... The loop works.
        .then(function(info){
            for(let i=0; i<16; i++)
            {
                weather[i] = {};
               weather[i] = info.data[i] 
            }
            
            //weather.iconId = data.weather.icon;
            weather.city = info.city_name;
            weather.country = info.country_code;
        })
        .then(function(){
            displayWeather();
        });
}

// display weather to UI
function displayWeather(){
    /* I haven't converted this all to react yet, obviously. 
    But if we have stuff to display on the Card or something,
    We can use this function to return the information we want.
    For example, if we have a temperature we want to return, we 
    could have some HTML like the following in the <body> of our page: 
        <div class="container">
            <div class="app-title">
              <p>Weather</p>
            </div>
            <div class="notification"> </div>
            <div class="weather-container">
                <div class="weather-icon">
                    <img src="icons/unknown.png" alt="">
                </div>
                <div class="temperature-value">
                    <p>- °<span>F</span></p>
                </div>
                <div class="temperature-description">
                    <p> - </p>
                </div>
                <div class="location">
                    <p>-</p>
                </div>
            </div>
        </div>
        <script src="WeatherAPI.js"></script>

    And some constructors at the top of this js page, like the following,
    to define each of the fields in the HTML:
        const iconElement = document.querySelector(".weather-icon");
        const tempElement = document.querySelector(".temperature-value p");
        const descElement = document.querySelector(".temperature-description p");
        const locationElement = document.querySelector(".location p");
        const notificationElement = document.querySelector(".notification");

    Then, the following lines could define what would appear within 
    each formerly "-"-filled field in the HTML:
        tempElement.innerHTML = `${weather[0].max_temp}`;
        escElement.innerHTML = weather[1].pop;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    
    We can get the projected precipitation for a day with 
        weather[daynumber(0 for today,up to 15)].precip,
    the projected wind for a day with weather[daynumber].wind_spd,
    the low temperature with weather[daynumber].min_temp or .low_temp
    Other options are here: https://www.weatherbit.io/api/weather-forecast-16-day
    */
}
