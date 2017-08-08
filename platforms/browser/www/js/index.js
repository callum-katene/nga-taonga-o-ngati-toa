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
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    //
    // function to set the audio source to the first selected phrase
    // IF audio is not currently playing
    $scope.setSourceToFirst = function() {
        $scope.audio.attr("src", null) ;
        $("li.phrase").each(function() {
            if(!$(this).hasClass("unselected_phrase")) {
                console.log("Found selected phrase. File is " + $(this).attr("file")) ;
                $scope.audio.attr("src",$(this).attr("file")) ;
                return false ;
            }
        }) ;
        $scopr.audio.load() ;
    } ;
    //
    // function to set audio source to next
    $scope.setSourceToNext = function() {

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
    $("audio").on("ended", function() {
        console.log("Player ended. ")
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
    $("#header_image").css("display","none") ;

}) ;
