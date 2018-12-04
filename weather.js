// JavaScript File

const cityIndex = [4]


$.getJSON("https://api.openweathermap.org/data/2.5/group?id=524894,1784658,658226,2643743,2800866&units=Metric&APPID=1e95685190869b57537a9047d4b3c76d", function(data) {
    console.log(data);

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
    
    var degrees = windDirection;


    $("#cityName").append("City: " + cityName);
    $("#weatherIcon").attr("src", weatherIcon);
    $("#weather").append("Weather today: " + weather);
    $("#temp").append("Temperature: " + temp + " Deg. Celsius");
    $("#pressure").append("Pressure: " + pressure + " hPa.");
    $("#humidity").append("Humidity: " + humidity + " %");
    $("#sunrise").append("At your location: " + sunrise);
    $("#sunriseLoc").append("Sunrise in " + cityName + ": " + sunriseLoc);
    $("#sunset").append("At your location: " + sunset);
    $("#sunsetLoc").append("Sunset in " + cityName + ": " + sunsetLoc);
    $("#tempMax").append("Maximum temperature: " + tempMax + " Deg. Celsius");
    $("#tempMin").append("Minimum temperature: " + tempMin + " Deg. Celsius");
    $("#windSpeed").append("Wind Speed: " + windSpeed + " mph");
    $("#windDirection").append("Wind direction: " + windDirection + " degrees");
    $("#windDirectionIcon").attr("src","images/windDirection.png");
    
    $("#windDirectionIcon").css({
        'height': '30px',
        'width': '20px',
        'transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-o-transform': 'rotate(' + degrees + 'deg)'
    });
        
    $("#clouds").append("Cloud cover: " + clouds + "%");


})


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
    console.log(userOffset);
    
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
