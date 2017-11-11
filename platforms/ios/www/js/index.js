
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
        var hammer_options = "" ;
        var hammertime = new Hammer($('body')[0]) ;
        hammertime.on('pan', function(ev) {
            console.log("Hammertime: " + JSON.stringify(ev)) ;
        }) ;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        $(".listening").text("Device ready")  ;
        // $(".listening").css('display', 'none') ;
        setInterval(function() {
            $("p.listening").css("display",'none') ;
        }, 5000) ;
        // document is now ready. need to activate angular now. We
        // do this so that controllers ( and therefore plugins )
        // are not accessed until after the ready event is received
     }
};

