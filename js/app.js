if (document.getElementById("weather")) {
  $(function() {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }


        function success(position) {
            // Get Location
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
                            
            // Fetch data from api
            $.getJSON('fetch.php', { lat: lat, long: long}, function (response) {
                updateDOM(response);
                console.log(response);
            });

            // Update the DOM to current information
            function updateDOM(data) {
                var temp = data.currently.temperature;
                var feels = data.currently.apparentTemperature;
                var desc = data.currently.summary;
                var icon = data.currently.icon;
                var skycons = new Skycons({ "color": "black" });

                $('#temp').html(temp);
                $('#feels').html("Feels like " + feels);
                $('#desc').html(desc);
                
                skycons.add(document.getElementById("icon"),icon);
                skycons.play();
            }

        }

        function error(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
        }
  });

  
}

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});