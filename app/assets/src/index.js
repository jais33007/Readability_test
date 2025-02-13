// load common scripts and styles

require('./include/app.js');
require('./include/style.scss');

// page specific scripts and styles

$.get("http://localhost:8765/tobii_pro/status/", function(data, status, xhr){
    console.log(data)
    if(data["is_connected"] != true){
        $.get("http://localhost:8765/tobii_pro/connect/", function(data, status, xhr){
            console.log("Connect to tobii eye tracker: " + data);
        });
    }
}, "json");

$.get("http://localhost:8765/recording/status/", function(data, status, xhr){
    console.log(data)
    if(data["is_reocrding"]){
        $.get("http://localhost:8765/recording/stop/", function(data, status, xhr){
            console.log("Stop recording :" + data);
        });
    }
}, "json");
