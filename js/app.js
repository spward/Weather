/*****************************
 **      Weather Page        **
 *****************************/
if (document.getElementById("weather")) {
  $(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function success(position) {
      // Get Location
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let skycons = new Skycons({ color: "#3e606f" });

      // Fetch data from api
      $.getJSON("fetch.php", { lat: lat, long: long }, function(response) {
        updateCurrent(response);
        updateDaily(response);
        // console.log(response);
      });

      // Update the DOM to current information
      function updateCurrent(data) {
        let currentData = data.currently;

        let currentDate = calculateDay(currentData.time);
        let temp = currentData.temperature;
        let feels = currentData.apparentTemperature;
        let desc = currentData.summary;
        let icon = currentData.icon;

        $("#current__date").html(currentDate);
        $("#current__temp").html("Currently " + temp + "&#8457;");
        $("#current__feels").html("Feels like " + feels + "&#8457;");
        $("#current__desc").html(desc);

        skycons.add(document.getElementById("current__icon"), icon);
        skycons.play();
      }

      // Update the DOM for the daily weather.
      function updateDaily(data) {
        var days = $("#card__days");

        for (var i = 1; i < data.daily.data.length; i++) {
          var dayData = data.daily.data[i];

          var date = calculateDay(dayData.time);
          var temp =
            dayData.temperatureHigh +
            "&#8457; / " +
            dayData.temperatureLow +
            "&#8457;";

          //append
          days.append(
            '<div class="card card__daily">\n' +
              '     <h2 id="daily__date' +
              i +
              '">' +
              date +
              "</h2>\n" +
              '    <canvas src="" alt="icon" class="icon" id="daily__icon' +
              i +
              '"></canvas>\n' +
              '    <div class="degrees">\n' +
              '        <h3 id="daily__high' +
              i +
              '" class="temp">' +
              temp +
              "</h3>\n" +
              "    </div>\n" +
              "\n" +
              '    <h3 id="daily__desc' +
              i +
              '">' +
              dayData.summary +
              "</h3>\n" +
              "</div>"
          );

          skycons.add(document.getElementById("daily__icon" + i), dayData.icon);

          skycons.play();
        }
      }

      // Convert Unix Time to the Month and Day.
      function calculateDay(unixTimestamp) {
        let months_arr = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        let date = new Date(unixTimestamp * 1000);
        let day = date.getDate();
        let month = months_arr[date.getMonth()];
        return month + " " + day;
      }
    }

    // Output any Errors.
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
