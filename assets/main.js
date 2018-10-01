

$(document).ready(function() {
    // var latitude,longitude;
    var api_key = "e0c8bb1701af4f5ea30184357180503&q=";
    var loc;

    $.getJSON('http://ipinfo.io', function(d) {
        loc = d.loc.split(",");

        var apiLink = "http://api.apixu.com/v1/forecast.json?key=";
        var days6 = "&days=6";
        var api = apiLink + api_key + loc[0] + ',' + loc[1] + days6;


        $.getJSON(api, function(v1) {
            var city = v1.location.region;
            var country = v1.location.country;
             
            var localtime = new Date();
            
            document.getElementById("datetime").innerHTML = localtime.toLocaleString();
            
            var hours = localtime.getHours();
            var temp_f = v1.current.temp_f;
            var temp_c = v1.current.temp_c;
            var humidity = v1.current.humidity;
            var wind_kph = v1.current.wind_kph;
            var wind_mph = v1.current.wind_mph;
            
            var weatherText = v1.current.condition.text;
            var icon = v1.current.condition.icon;
            var currentIconCode = v1.current.condition.code;
            var tempSwap = true;
            var windSwap = true;
            var tempSwapForecast = true;
            var iconsLinkNight = "//cdn.apixu.com/weather/64x64/night/";
            var iconsLinkDay = "//cdn.apixu.com/weather/64x64/day/"

            var clear = [1000],
                partlyCloudy = [1003],
                cloudy = [1006, 1009],
                lightRain = [1072, 1050, 1053, 1168, 1080, 1183, 1171, 1063, 1083, 1086, 1089, 1240, 1273,1153],
                heavyRain = [1192, 1195, 1198, 1201, 1243, 1246],
                thunder = [1087, 1276],
                fog = [1030, 1135, 1147],
                icePellets = [1237, 1261, 1264],
                lightSnow = [1066, 1069, 1204, 1249, 1207, 1210, 1213, 1216, 1219, 1252, 1255],
                snow = [1114, 1117, 1222, 1225, 1258, 1279, 1282];

            var nightTimes = [18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];


            var forecastdayData = v1.forecast.forecastday;

            var days = forecastdayData.map(function(x) {
                return x.day;
            });

            var maxtempc = days.map(function(x) {
                return x.maxtemp_c;
            });

            var mintempc = days.map(function(x) {
                return x.mintemp_c;
            });

            var maxtempf = days.map(function(x) {
                return x.maxtemp_f;
            });

            var mintempf = days.map(function(x) {
                return x.mintemp_f;
            });




            (function backgroundImageChange() {
                // Om väder klart
                if (clear.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/clear.jpg)');
                } else if (clear.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/sunny.jpg)');
                }

                // Om väder delvis molnigt
                if (partlyCloudy.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/partly-cloudy-night.jpg)');
                } else if (partlyCloudy.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/partly-cloudy-day.jpg)');
                    console.log("hellooooo");
                }

                // Om väder molnigt
                if (cloudy.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/cloudy-night.jpg)');
                } else if (cloudy.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/cloudy-day.jpg)');
                }


                // Om det är väderljus regn
                if (lightRain.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/light-rain-night.jpg)');
                } else if (lightRain.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/light-rain-day.jpg)');
                }

                // Om väder tungt regn
                if (heavyRain.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/heavy-rain-night.jpg)');
                } else if (heavyRain.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/heavy-rain-day.jpg)');
                }

                // Om vädret åska
                if (thunder.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/thunder.jpg)');
                }

                // Om väder dimma
                if (fog.indexOf(currentIconCode) !== -1 && nightTimes.indexOf(hours) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/fog-night.jpg)');
                } else if (fog.indexOf(currentIconCode) !== -1 && hours < 18 && hours > 6) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/fog-day.jpg)');
                }

                // Om väderispellets
                if (icePellets.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/ice-pellets.jpg)');
                }

                // if weather lightSnow
                if (lightSnow.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/snow-light.jpg)');
                }

                // Om väder snö
                if (snow.indexOf(currentIconCode) !== -1) {
                    $('#bg-image, #weather-box').css('background-image', 'url(img/snow.jpg)');
                }
            })();



            (function forecastDays() {
                var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


                var now = new Date();
                var dayIdx = now.getDay();
                

                $('.forecastText').each(function(idx, el) {
                    $(el).html(daysOfWeek[(dayIdx + idx) % 7]);
                });

            })();


            (function forecastData() {

                $('.forecasticons img').each(function(i) {
                    $(this).attr('src', days[i].condition.icon);

                });


                $('.frc-temp').each(function(i) {
                   // Tillagt en "enheter" egendom, så temperaturen
                   // kan spåra vilken typ av enhet den visar.
                    $(this).data("units", "c");
                    $(this).html(Math.round(maxtempc[i]) + " - " + Math.round(mintempc[i]));

                });

                $('.frc-degree').on("click", function() {
                    // När vi använder .frc-temp el, hänvisa det en gång till.
                    var myTempEl = $(this).parent().find(".frc-temp");
                    // Detta är det unika indexet för den klickade dagen.

                    var myIndex = $(".forecastday").index(
                        $(this).parents(".forecastday")
                    );


                    /****
                      * Ovan har jag skapat ett datattribut på
                      * .frc-temp element för att lagra enheterna. Av
                      * gör detta blir elementet själv-
                      * Innehållet. Här kan jag byta enheterna
                      * baserat på datatributet.
                     ****/
                    if (myTempEl.data("units") === "f") {
                        // Först byt enhetens attribut ...
                        myTempEl.data("units", "c");
                        // Därefter ersätt innehållet i temp el
                        myTempEl.hide().html(
                            Math.round(maxtempc[myIndex]) +
                            " - " +
                            Math.round(mintempc[myIndex])).fadeIn(700);
                        // Ange sedan innehållet till "c"
                        $(this).html(" &deg;C");
                        tempSwapForecast = true;
                    } else {
                        myTempEl.data("units", "f");
                        myTempEl.hide().html(
                            Math.round(maxtempf[myIndex]) +
                            " - " +
                            Math.round(mintempf[myIndex])).fadeIn(700);
                        $(this).html("&deg;F");
                        tempSwapForecast = false;
                    }
                });
            })();


            (function cityBox() {
                $("#city-box").html(city + " , " + country);

                $('#city-box').prepend('<div class="row"><img class="icon" alt="weather-icon" src="' + icon + '"></div>');
                $('#weather').html(Math.round(temp_c));
                $('#wind').html(wind_kph);
                $('#textTemp').html(weatherText);
            })();


            (function buttonDegree() {
                $('#btn-degree').click(function() {
                    /* Agera på evenemanget */
                    if (tempSwap === false) {
                        $('#weather').hide().html(Math.round(temp_c)).fadeIn(700);
                        $('#btn-degree').html("&deg;C");
                        tempSwap = true;
                    } else {
                        $('#weather').hide().html(Math.round(temp_f)).fadeIn(700);
                        $('#btn-degree').html("&deg;F");
                        tempSwap = false;
                    }
                });
            })();

           

            (function buttonWind() {
                $('#btn-wind').click(function() {
                    /* Agera på evenemanget */
                    if (windSwap === false) {
                        $('#wind').hide().html(wind_kph).fadeIn(700);
                        $('#btn-wind').html("<strong>kph</strong>");
                        windSwap = true;
                    } else {
                        $('#wind').hide().html(wind_mph).fadeIn(700);
                        $('#btn-wind').html("<strong>mph</strong>");
                        windSwap = false;
                    }
                });
            })();
        });
    });
});


