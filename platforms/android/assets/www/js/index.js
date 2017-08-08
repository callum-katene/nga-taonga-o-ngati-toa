// app is used by the cordova initialization
var app = {
    // Application Constructor
    initialize: function() {
        console.log("Initialising") ;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log("Binding to events") ;
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("deviceReady event received") ;
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        $(".listening").text("Device ready")  ;
        // $(".listening").css('display', 'none') ;
        setInterval(function() {
            $("p.listening").css("display",'none') ;
        }, 50000) ;
        console.log('Received Event: ' + id);
    }
};


var angApp = angular.module("nga-taonga-o-ngati-toa", ["ngRoute"]);
// routeProvider is configured to control application routing. For eaach pattern it specifies
// the template html file to apply and the controller to use.
// tempPlateUrl either refers to the ng-templates in the html file, or a specific html file
angApp.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "top.html" })
        .when("/whakatauki.html", { templateUrl: "whakatauki.html", controller: "controller" })
        .when("/moteatea.html", { templateUrl: "moteatea.html", controller: "controller" })
        .when("/karakia.html", { templateUrl: "karakia.html", controller: "controller" })
        .when("/e_pa_to_hau.html", { templateUrl: "e_pa_to_hau.html", controller: "player" })
        .otherwise({  template: "<h1>What the blazes!!</h1>" }) ;
}) ;
//
// controller is the menu controller for all the menu pages. All menu items are
// contained in the main_menu.json file, and the templateUrl specifies which
// menu to present
angApp.controller("controller", function($scope, $http, $location) {
    $http.get("res/main_menu.json").then(function (v) {
        console.log("JSON loaded successfully") ;
        $scope.menuitems = v.data ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
    } ;
    // if this controller loads it is because we're on a menu page, so
    // ensure the header is visible and the audio player is hidden
    $("#header_image").css("display","block") ;
    $("audio").hide() ;
}) ;

angApp.controller("player", function($scope, $http) {
    $scope.nowPlaying = false ;
    $scope.audio = $("audio") ;
    $("#header_image").css("display","none") ;
    //
    // function to set the audio source to the first selected phrase
    // IF audio is not currently playing
    $scope.setSourceToFirst = function() {
        console.log("setSourceToFirst") ;
        // $scope.audio.attr("src", null) ;
        var list = $("li.phrase") ;
        console.log("List size: " + list.length) ;
        list.each(function() {
            console.log("This: " + $(this)) ;
            if(!$(this).hasClass("unselected_phrase")) {
                console.log("Found a selected phrase. File is " + $(this).attr("file")) ;
                $scope.audio.attr("src",$(this).attr("file")) ;
                return false ;
            }
            else {
                console.log("Else: " + $(this)) ;
            }
        }) ;
        console.log("Finish") ;
        $scope.audio[0].load() ;
    } ;
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;

    }, function(v) {
        console.log("error: " + v);
    }) ;
    //
    // function to set audio source to next
    $scope.setSourceToNext = function(current_rec) {
        //loop through to find the phrase with this rec
        var x = 0 ;
        var ret = null ;
        var list = $("li.phrase") ;
        list.each(function() {
            if($(this).attr("file") === current_rec) {
                console.log("Found " + current_rec + " at position " + x) ;
                return false ;
            }
            else {
                x += 1 ;
            }
        }) ;
        if(x === list.length) {
            console.log("Current recording " + current_rec + " not found in list! This should not happen") ;
        }
        else {
            console.log("List size is " + list.length) ;
            // now we loop through to find the next selected phrase
            // start at current position plus one
            var newx = x ;
            do {
                newx += 1;
                newx = (newx == list.length ? 0 : newx) ;
                console.log('newx: ' + newx) ;
                if(!list.eq(newx).hasClass("unselected_phrase")) {
                    console.log("Found selected phrase at " + newx) ;
                    ret = list.eq(newx).attr("file") ;
                }
                else {
                    console.log("item at position " + newx + " is unselected") ;
                }
            } while (ret === null && newx !== x) ;
        }

        $scope.audio.attr("src",ret) ;
        $scope.audio[0].load() ;
        if(ret) {
            console.log("Playing new rec: " + ret) ;
            $scope.audio[0].play() ;
        }
        else {
            console.log("No next rec so disabling player") ;
        }

    } ;
    //
    // doToggle function adds or removes the unselected_phrase class
    // from a phrase.
    $scope.doToggle = function(val) {
        var myEl = $("ul li").eq(val) ;
        if(myEl.hasClass("unselected_phrase")) {
            console.log("Selected element has unselected class so removing ...") ;
            myEl.removeClass("unselected_phrase") ;
        }
        else {
            myEl.addClass("unselected_phrase") ;
            console.log("Selected element does not have unselected class so adding ...") ;
        }
        if(!$scope.nowPlaying) {
            $scope.setSourceToFirst() ;
        }
    } ;
    //
    // audio player event listeners
    $("audio").on("ended", function() {
        var current_rec = $(this).attr("src") ;
        console.log("Player ended. " + current_rec) ;
        $scope.setSourceToNext(current_rec) ;
    })
    .on("pause", function () {
        console.log("Player paused");
            $scope.nowPlaying = false;
    })
    .on("playing", function () {
            console.log("Player playing");
            $scope.nowPlaying = true;
    })
    .show();

}) ;
