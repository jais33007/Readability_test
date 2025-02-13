// load common scripts and styles

require('./include/app.js');
require('./include/style.scss');

// page specific scripts and styles

window.Tether = require('tether');
var SelectionMenu = require('selection-menu');
var Mark = require('mark.js');

var mark = new Mark("div#container-up");
var current_para_num = 1;
var prev_para_num = 0;
var next_para = 2;



$(function() {
    var counter = 0;
    window.isKeyPressed = false;

    $.get('http://localhost:8765/recording/start/', function(data, status, xhr) {
        if (data["response"] === "succeeded") {
            console.log("Started recording")
        } else {
            alert("Recording error");
        }
    }, "json");


    $("#button-start-reading").on("click", function(){

        $("#container-background").hide()
        $("#container-up").show()
        $("#title").show()
        $("#para-" + current_para_num).show()
        $("#button-calibrate").hide()
        $("#button-next-page").show()
        $("#button-start-reading").hide()
        $("#button-start-solving").hide()
        current_para_num += 1;
        prev_para_num += 1;
        next_para += 1;


    });

    $("#button-next-page").on("click", function(){

        $("#container-background").hide()
        // $("#title").hide()
        // $(".paragraph").css({"display": "inline"})
        // $("#container-up").show()

        // console.log(current_para_num)
        var coordinates= [];
        var i=1;
         $(".word").each(function () {

              var txt= $(this).text();
              var t= $(this).offset().top;
              var l= $(this).offset().left;
              var b= t+ $(this).outerHeight();
              var r= l+ $(this).outerWidth();
              coordinates.push([i,txt,t,l,b,r]);
              i++;
       });
      console.log(coordinates);
        $("#para-" + prev_para_num).hide();
        $("#para-" + current_para_num).show()
        $("#button-calibrate").hide()
        $("#button-start-reading").hide()
        if ($("#para-" + next_para).length){
          $("#button-next-page").show()}
        else
        {
          $("#button-next-page").hide()
          $("#button-start-solving").show()

          var coordinates= [];
          var i=1;
           $(".word").each(function () {

                var txt= $(this).text();
                var t= $(this).offset().top;
                var l= $(this).offset().left;
                var b= t+ $(this).outerHeight();
                var r= l+ $(this).outerWidth();
                coordinates.push([i,txt,t,l,b,r]);
                i++;
         });
        console.log(coordinates);
        }
        current_para_num += 1;
        prev_para_num += 1;
        next_para += 1;


    // $("#button-start-solving").on("click", function(){
    //     //$(".paragraph").css({"display": "inline"})
    //     $("#container-up").show()
    //     $("#button-start-reading").hide()
    //     $("#button-start-solving").show()
    // });



    $("#button-start-solving").on("click", function() {
        counter = 1;


        $("#button-start-solving").hide();
        $("#container-up").hide();
        $("#content-" + counter).show();
        $("#button-next").show();

    });

    $("#button-next").on("click", function() {
        // console.log(counter);
        $("#content-1").hide()
        $("#content-2").show()
        $("#button-next").hide()
        // $("#content-" + counter).hide();
        // counter += 1;
        // $("#content-" + counter).show();
        $("#button-last").show()

        // console.log(counter);

      // if (counter == 3) {
      //   $("#container-bottom").hide();
      //   $("#button-next").hide();
      //   $("#container-up").hide();
      //   $("#button-stop-recording").show();
      //   $("#end").show();
      // }
    });

    $("#button-last").on("click", function() {
      // $("#content-" + counter).hide();
      // counter +=1;
      $("#content-2").hide()
      $("#button-last").hide()
      $("#container-bottom").hide();
      $("#button-next").hide();
      $("#container-up").hide();
      $("#button-stop-recording").show();
      $("#end").show();
    });


    $("#button-stop-recording").on("click", function() {
        window.history.back(-1);
    });

    $(window).on("beforeunload", function() {
      $.get('http://localhost:8765/recording/stop/', function(data, status, xhr) {
          console.log(data);
      });
    });

    window.onmousedown = function(e) {
      $.get('http://localhost:8765/recording/capture/', function(data, status, xhr) {
          console.log("Capture a screen shot :" + data);
      });
    };

    $(window).on("keydown", function(e) {
        if (window.isKeyPressed == false) {
            window.isKeyPressed = true;
            $.get('http://localhost:8765/recording/artifact/?data=' + e.keyCode + '_down', function(data, status, xhr) {
                console.log(data);
            });
        }
    });

    $(window).on("keyup", function(e) {
        window.isKeyPressed = false;
        $.get('http://localhost:8765/recording/artifact/?data=' + e.keyCode + '_up', function(data, status, xhr) {
            console.log(data);
        });
    });

    $(function() {
        $("#button-calibrate").on("click", function(){
            $(this).blur();
            $(this).css("outline", "none");
            $.get('http://localhost:8765/tobii_pro/calibrate/', function(data, status, xhr) {
                console.log("Calibration :" + data);
            });
        });
    });
});
});
