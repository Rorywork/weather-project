// JavaScript File

// Using the openweathermap API return weather data for multiple European cities by ID
$.getJSON("https://api.openweathermap.org/data/2.5/group?id=2643743,2950159,3117735,2800866,2988507,683506,2761369,756135,3054643,3067696,2964574,658225&units=Metric&APPID=1e95685190869b57537a9047d4b3c76d", function(data) {
    console.log(data);
   
    // Loop for populating data and dynamically generating the HTML output   
    var cityIndex 
    for (cityIndex = 0; cityIndex < 12; cityIndex++) {

        var cityName = data.list[cityIndex].name;
        var weatherIcon = "https://openweathermap.org/img/w/" + data.list[cityIndex].weather[0].icon + ".png";
        // var temp = Math.floor(data.list[cityIndex].main.temp - 273);
        var temp = ConvertKelvin2Celsius(data.list[cityIndex].main.temp);
        var pressure = data.list[cityIndex].main.pressure;
        var humidity = data.list[cityIndex].main.humidity;
        var weather = data.list[cityIndex].weather[0].main + ", " + data.list[cityIndex].weather[0].description;
        // var sunrise = ConvertUnixTime2Regular(1543792580); -result should be "23:16"
        var sunrise = ConvertUnixTime2Regular(data.list[cityIndex].sys.sunrise);
        var sunriseLoc = ConvertUserTime2LocalTime(sunrise, cityName);
        var sunset = ConvertUnixTime2Regular(data.list[cityIndex].sys.sunset);
        var sunsetLoc = ConvertUserTime2LocalTime(sunset, cityName);
        var tempMax = ConvertKelvin2Celsius(data.list[cityIndex].main.temp_max);
        var tempMin = ConvertKelvin2Celsius(data.list[cityIndex].main.temp_min);
        var windSpeed = ConvertMpsToMph(data.list[cityIndex].wind.speed);
        var windDirection = data.list[cityIndex].wind.deg;
        var clouds = data.list[cityIndex].clouds.all;
        var windDirectionIcon = "images/windDirectionWhite.png";
    
        var degrees = windDirection;
        // console.log(degrees);


        // HTML Header and footer code
        var html_hdr = "<div class='weather-container'>"
        var html_row_hdr = "<div class='row'>"
        var html_col_hdr = "<div class='col-3'>"
        var html_close_div = "</div>"
    
        // HTML City and Weathe Icon code
        var html_city_icon = "<ul class='list-style'><li class='city-name'>" + cityName + "</li><img src='" + weatherIcon + "' class='weatherIcon'></ul>"
        var html4CityCol = html_row_hdr + html_col_hdr + html_city_icon + html_close_div
    
        // HTML Temp, pressure, Humidity and Clouds code
        var html_wtphc = "<ul class='list-style'><li class='weather'>Weather today: " + weather + "</li><li class='temp'>Temperature: " + temp + " Deg. Celsius</li><li class='pressure'>Pressure: " + pressure + " hPa.</li><li class='humidity'>Humidity: " + humidity + " %</li><li class='clouds'>Cloud cover: " + clouds + " %</li></ul>"
        var html4wtphcCol = html_col_hdr + html_wtphc + html_close_div
    
        // HTML Sunrise and sunset code
        var html_sun = "<ul class='list-style'><li class='sunriseLoc'>Sunrise in " + cityName + ": " + sunriseLoc  + "</li><li class='sunrise'>At your location: " + sunrise + "</li><li class='sunsetLoc'>Sunset in " + cityName + ": " + sunsetLoc + "</li><li class='sunset'>At your location: " + sunset + "</li></ul>"
        var html4sunCol = html_col_hdr + html_sun + html_close_div
    
        // HTML temp range and wind direction code
        var html_temprange_wind ="<ul class='list-style'><li class='tempMax'>Max. temperature: " + tempMax + " Deg. Celsius</li><li class='tempMin'>Min. temperature: " + tempMin + " Deg. Celsius</li><li class='windSpeed'>Wind Speed: " + windSpeed + " mph</li><li class='windDirection'>Wind direction: " + windDirection + " Deg.</li><li><img src='" + windDirectionIcon + "' class='windDirectionIcon" + cityIndex + "'></li></ul>"
        var html4rangewindCol = html_col_hdr + html_temprange_wind + html_close_div   
    
        // Append the data and HTML tags to the DOM
        $(".body-container").append(html_hdr + html4CityCol + html4wtphcCol + html4sunCol + html4rangewindCol + html_close_div + html_close_div);
    
        // Rotate the windDirectionIcon as per the wind direction degrees
        $(".windDirectionIcon" + cityIndex).css({
            'height': '25px',
            'width': '15px',
            'transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            '-moz-transform': 'rotate(' + degrees + 'deg)',
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-o-transform': 'rotate(' + degrees + 'deg)'
        });
    
    }


})

//-----------------------------------------------------------------------------------------------

function ConvertMpsToMph(x) {
    
    return Math.floor(x*2.24)
}


function ConvertKelvin2Celsius(k) {

    return Math.floor(k - 273);

}


function ConvertUnixTime2Regular(utc) {

    var t = new Date(utc * 1000);
    var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);

    return (formatted);


}

function ConvertUserTime2LocalTime(time, city) {
    
    //Get the timezone of the user and convert to integer 0..23 to be used as an user offset 
    var d = new Date();
    var userOffset = d.getTimezoneOffset()/60;
    // console.log(userOffset);
    
    var timezone0 = ["London","Dublin","Reykjavik", "Lisbon"];      // Western European Timezone Capitals
    var timezone2 = ["Sofia", "Tallinn", "Riga","Helsinki","Athens","Kiev","Vilnius","Bucharest", "Moscow", "Ankara"]; // Eastern European Timezone Capitals
    
    var timezoneOffset = 1;                 // Default offset of 1 for all Central European Ccountry Cities (majority) 
    if (timezone0.indexOf(city) > -1 ) timezoneOffset = 0;
    if (timezone2.indexOf(city) > -1 ) timezoneOffset = 2;
    
    var hrsAdjust = parseInt(time.substring(0,2)) + timezoneOffset - userOffset;
    
    if (hrsAdjust < 10)  hrsAdjust = "0" + hrsAdjust ;
    
    return (hrsAdjust + time.substring(2,5))
}


 describe("Conversion Functions", () => {
    it ("Converts from Kelvin to Celcius", () => {
        
        // arrange
        const num1 = 300
        
        // act    
        const result = ConvertKelvin2Celsius(num1);
        
        // assert
        expect(result).toBe(27);
    });

    it ("Converts from Unix to Normal Time", () =>{
        
        // arrange
        const num1 = 1543792580
        
        // act
        const result = ConvertUnixTime2Regular(num1);
        
        // assert
        expect(result).toBe("23:16")
    });
    
    it("Converts from mps to mph", () =>{
        
        // arrange
        const num1 = 4
        
        // act
        const result = ConvertMpsToMph(num1)
        
        // assert
        expect(result).toBe(8)
    })

    
});
