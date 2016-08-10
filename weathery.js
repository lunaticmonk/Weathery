// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         console.log(position.coords.latitude +','+ position.coords.longitude);
//     });
// } else {
//     loadWeather("Bangalore,IN","");
// }

// $(document).ready(function (){
//     setInterval(loadWeather,10000);
// });

// function loadWeather(location,woeid){
//     $.simpleWeather({
//         location: location,
//         woeid: woeid,
//         unit: 'C',
//         success: function(weather){
//             city = weather.city;
//             temp = weather.temp + '&deg;';
//             wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
//             wind = '<p>'+ weather.wind.speed +'</p><p>'+ weather.units.speed +'</p>';
//             humidity = weather.humidity +' %';
//             $(".location").text(city);
//             $(".temperature").html(temp);
//             $(".climate_bg").html(wcode);
//             $(".windspeed").html(wind);
//             $(".humidity").text(humidity);
//         },
//         error: function(error){
//             $(".error").html('<p>'+ error +'</p>');
//         }
        
//     });
// }

(function(){
    $('#submitbtn').on('click',function(e){
        var location = $('#cityname').val();
        getForecast(location);
        e.preventDefault();
    });
    function getForecast(location){
        $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json',function (data){
               if(data.query.results === null){
                alert('Please enter a valid city name.');
               }
               else{
               console.log(data);
               $('.forecast').html('<h4>' + data.query.results.channel.item.title + '</h4>');
               $('.forecast').append('<ul><li>Humidity: ' + data.query.results.channel.atmosphere.humidity);
               $('.forecast').append('<ul><li>pressure: ' + data.query.results.channel.atmosphere.pressure);
               $('.forecast').append('<ul><li>rising: ' + data.query.results.channel.atmosphere.rising);
               $('.forecast').append('<ul><li>visibility: ' + data.query.results.channel.atmosphere.visibility + '</ul>');
               $('.forecast').append('Temperature in Farenheits : ' + data.query.results.channel.item.condition.temp + ' ' + data.query.results.channel.item.condition.text);
               $('.forecast').append('<br' + 'Temp in farenheits :' + data.query.results.channel.item.description);
               showInfo(data);
       }
    });
    }

    function showInfo(data){
      console.log(data);
      if(data.query.results.channel.item.condition.temp<'68'){
        $('.precaution').append('The place is enough cold to make you sick.');
        $('.precaution').append('Carry warm clothes with you.');
        $('.precaution').append('Sudden temperature change may cause your health to spoil.');
      }
      else if(data.query.results.channel.item.condition.temp>'68' || data.query.results.channel.item.condition.temp<'87'){
        $('.precaution').append('<br>' + '<li>The place has low temperature.Good weather,soothing air for sight-seeing.');
        $('.precaution').append('<br>' + '<li>Not necessary but still carry extra clothes to warm you up.');
        $('.precaution').append('<br>' + '<li>Sudden temperature change may cause your health to spoil.' + '</ul>');
      }

      else if(data.query.results.channel.item.condition.temp>'86' || data.query.results.channel.item.condition.temp<'106'){
        $('.precaution').append('<br>' + '<li>The place has medium temperature.Good weather,but humidity is more.');
        $('.precaution').append('<br>' + '<li>No extra clothing demands.Normal ones would be good.Woah!');
        $('.precaution').append('<br>' + '<li>Temperature is normal.No need to worry.' + '</ul>');
      }

      else if(data.query.results.channel.item.condition.temp>'105'){
        $('.precaution').append('<br>' + '<li>The place has high temperature.Bad atmospheremmay damage skin.');
        $('.precaution').append('<br>' + '<li>Wear cotton clothes.Loose clothes made of linen would be very comfortable.');
        $('.precaution').append('<br>' + '<li>No environment for tourism or sight-seeing.' + '</ul>');
      }       
  }

})();
