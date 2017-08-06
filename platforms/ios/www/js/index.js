
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
        }, 10000) ;
        console.log('Received Event: ' + id);
    }
};

var angApp = angular.module("nga-taonga-o-ngati-toa", ["ngRoute"]);
// angApp.config(function($locationProvider) {
//     $locationProvider.html5Mode(
//         {enabled: true, requireBase: false}
//     )
// }) ;
angApp.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "top.html" })
        .when("/whakatauki.html", { templateUrl: "whakatauki.html" })
        .when("/moteatea.html", { templateUrl: "moteatea.html" })
        .when("/karakia.html", { templateUrl: "karakia.html" })
        .otherwise({  template: "<h1>What the blazes!!</h1>" }) ;
}) ;
angApp.controller("controller", function($scope, $http, $location) {
    $http.get("res/main_menu.json").then(function (v) {
        console.log("JSON loaded successfully") ;
        $scope.menuitems = v.data ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        // window.location.href = url ;
        $location.path(url) ;
    }
}) ;