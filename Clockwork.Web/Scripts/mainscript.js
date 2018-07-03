$(document).ready(LoadAllInitial());

function UserAction(offset) {
    var xhttp = new XMLHttpRequest();
    if (offset < 0)
        var timeZone = offset + ":00";
    else
        var timeZone = offset + ":00";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse = JSON.parse(this.responseText);
            if (document.getElementById("queries").value < 20)
                document.getElementById("queries").value += 1;

            $('#results').append('<tr><td>' + jsonResponse["currentTimeQueryId"] + '</td><td>' + jsonResponse["time"] + '</td><td>' +
                jsonResponse["utcTime"] + '</td><td>' + jsonResponse["timeZone"] + '</td><td>' + jsonResponse["clientIp"] + '</td ></tr >');
        }
    };
    xhttp.open("GET", "http://localhost:53958/api/currenttime/" + offset + "/" + timeZone, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function LoadAll() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse = JSON.parse(this.responseText);
            var jsonLenght = jsonResponse.length;
            var selectedLength = document.getElementById("queries").value;

            $('#results').html('<tr><th>ID</th><th>Server Time</th><th>UTC Time</th><th>Time Zone</th><th>Client IP</th></tr>');
            for (var i = 0; i < selectedLength; i++) {
                if (i == jsonLenght)
                    break;

                $('#results').append('<tr><td>' + jsonResponse[i]["currentTimeQueryId"] + '</td><td>' + jsonResponse[i]["time"] + '</td><td>' +
                    jsonResponse[i]["utcTime"] + '</td><td>' + jsonResponse[i]["timeZone"] + '</td><td>' + jsonResponse[i]["clientIp"] + '</td ></tr >');
            }

            if (selectedLength > jsonLenght) {
                alert("Only " + jsonLenght + " entries in databse!")
                document.getElementById("queries").value = jsonLenght;
            }
        }
    };
    xhttp.open("GET", "http://localhost:53958/api/currenttime/all", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function LoadAllInitial() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse = JSON.parse(this.responseText);
            var jsonLenght = jsonResponse.length;

            if (jsonLenght < 20)
                document.getElementById("queries").value = jsonLenght;
            else
                document.getElementById("queries").value = 20;

            for (var i = 0; i < jsonLenght; i++) {
                $('#results').append('<tr><td>' + jsonResponse[i]["currentTimeQueryId"] + '</td><td>' + jsonResponse[i]["time"] + '</td><td>' +
                    jsonResponse[i]["utcTime"] + '</td><td>' + jsonResponse[i]["timeZone"] + '</td><td>' + jsonResponse[i]["clientIp"] + '</td ></tr >');
            }
        }
    };
    xhttp.open("GET", "http://localhost:53958/api/currenttime/all", true);
    xhttp.setRequestHeader("Content-type", "applicarion.json");
    xhttp.send();
}