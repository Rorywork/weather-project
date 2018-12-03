// JavaScript File

const cityIndex = 1

$.getJSON("https://api.openweathermap.org/data/2.5/group?id=524894,1784658,658226,2643743&units=Metric&APPID=1e95685190869b57537a9047d4b3c76d", function(data) {
    console.log(data);

    var cityName = data.list[cityIndex].name;
    var icon = "https://openweathermap.org/img/w/" + data.list[cityIndex].weather[0].icon + ".png";
    // var temp = Math.floor(data.list[cityIndex].main.temp - 273);
    var temp = ConvertKelvin2Celcius(data.list[cityIndex].main.temp);
    var weather = data.list[cityIndex].weather[0].main;
    // var sunrise = ConvertUnixTime2Regular(1543792580);
    var sunrise = ConvertUnixTime2Regular(data.list[cityIndex].sys.sunrise);
    var tempMax = ConvertKelvin2Celcius(data.list[cityIndex].main.temp_max);


    $("#cityName").append(cityName);
    $("#icon").attr("src", icon);
    $("#weather").append(weather);
    $("#temp").append(temp);
    $("#sunrise").append(sunrise);
    $("#tempMax").append(tempMax);


})


function ConvertKelvin2Celcius(k) {

    return Math.floor(k - 273);

}


function ConvertUnixTime2Regular(utc) {

    var t = new Date(utc * 1000);
    var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);

    return (formatted);


}