
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
        .when("/haka.html", { templateUrl: "haka.html", controller: "controller" })
        .when("/pepeha.html", { templateUrl: "pepeha.html", controller: "controller" })
        .when("/waiata.html", { templateUrl: "waiata.html", controller: "controller" })
        .when("/tera_ia_nga_tai_o_honipaka.html", { templateUrl: "tera_ia_nga_tai_o_honipaka.html", controller: "player" })
        .when("/e_whatoro_ana.html", { templateUrl: "e_whatoro_ana.html", controller: "player" })
        .when("/te_roa_o_te_po.html", { templateUrl: "te_roa_o_te_po.html", controller: "player" })
        .when("/toea_mai_ra.html", { templateUrl: "toea_mai_ra.html", controller: "player" })
        .when("/moe_hurihuri.html", { templateUrl: "moe_hurihuri.html", controller: "player" })
        .when("/tau_mai_e_kapiti.html", { templateUrl: "tau_mai_e_kapiti.html", controller: "player" })
        .when("/ka_oho_te_wairua.html", { templateUrl: "ka_oho_te_wairua.html", controller: "player" })
        .when("/he_hokioi.html", { templateUrl: "he_hokioi.html", controller: "player" })
        .when("/ka_tukituki.html", { templateUrl: "ka_tukituki.html", controller: "player" })
        .when("/kikiki_kakaka.html", { templateUrl: "kikiki_kakaka.html", controller: "player" })
        .when("/tau_mai_e_kapiti.html", { templateUrl: "tau_mai_e_kapiti.html", controller: "player" })
        .when("/takapuwahia.html", { templateUrl: "takapuwahia.html", controller: "player" })
        .when("/hongoeka.html", { templateUrl: "hongoeka.html", controller: "player" })
        .when("/koata.html", { templateUrl: "koata.html", controller: "player" })
        .otherwise({  template: "<h2>Under development</h2>" }) ;
}) ;
//
// controller is the menu controller for all the menu pages. All menu items are
// contained in the main_menu.json file, and the templateUrl specifies which
// menu to present
angApp.controller("controller", function($scope, $http, $window, $location) {
    console.log("controller controller") ;
    $http.get("res/main_menu.json").then(function (v) {
        console.log("main_menu JSON loaded successfully") ;
        $scope.menuitems = v.data ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    $scope.footer = $("footer") ;
    // $scope.footer.height(52) ;
    $("#player_all").hide() ;
    $("#player_none").hide() ;
    $window.plugins.insomnia.allowSleepAgain() ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
    } ;
    // if this controller loads it is because we're on a menu page, so
    // ensure the header is visible and the audio player is hidden
    $("#header_image").css("display","block") ;
    //
    // if this controller is active then we are on a menu page
    // so the audio player needs to be paused, hidden, and event
    // listeners disabled
    $("audio")
        .off("ended")
        .off("playing")
        .off("paused")
        .hide()
        [0].pause() ;
}) ;

angApp.controller("player", function($scope, $http, $window) {
    console.log("player controller") ;
    $scope.nowPlaying = false ;
    $scope.audio = $("audio") ;
    $scope.footer = $("footer") ;
    $scope.song_title = $(".song_title") ;
    $window.plugins.insomnia.keepAwake() ;
    $scope.lyric_panel = $(".lyric_panel") ;
    $("#header_image").css("display","none") ;
    //
    // init_audio is designed to be called after the
    // song phrases have been loaded. uses an ng-init
    // in the ul
    $scope.init_audio = function(first_file) {
        console.log("First song file: " + first_file);
        if(first_file) {
            $scope.audio.attr("src", first_file) ;
            $scope.audio[0].load() ;
        }
    } ;
    // function to set the audio source to the first selected phrase
    // IF audio is not currently playing
    $scope.setSourceToFirst = function() {
        console.log("setSourceToFirst") ;
        $scope.audio.attr("src", null) ;
        var list = $("li.phrase") ;
        console.log("List size: " + list.length) ;
        list.each(function() {
            // console.log("This: " + $(this)) ;
            if(!$(this).hasClass("unselected_phrase")) {
                console.log("Found a selected phrase. File is " + $(this).attr("file")) ;
                $scope.audio.attr("src",$(this).attr("file")) ;
                return false ;
            }
            else {
                // console.log("Else: " + $(this)) ;
            }
        }) ;
        $scope.audio[0].load() ;
    } ;
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    //
    // select all phrases
    $scope.selectAllPhrases = function() {
        console.log("selecting all phrases") ;
        $("li.phrase").each(function () {
            if($(this).hasClass("unselected_phrase")) {
                $(this).removeClass("unselected_phrase") ;
            }
        });
    } ;
    //
    // deselect all phrases
    $scope.unselectAllPhrases = function() {
        console.log("de-selecting all phrases") ;
        $("li.phrase").each(function () {
            if(! $(this).hasClass("unselected_phrase")) {
                $(this).addClass("unselected_phrase") ;
            }
            // $(this).css("border","none") ;
        });
        if(! $scope.nowPlaying) {
            $scope.audio.attr("src", null) ;
            $scope.audio[0].load() ;
        }
    } ;
    // hide the All and None buttons
    $("#player_all").show().click(function() {
        $scope.selectAllPhrases() ;
        $scope.setSourceToFirst() ;
    }) ;
    $("#player_none").show().click(function() {
        $scope.unselectAllPhrases() ;
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
            // now we loop through to find the next selected phrase
            // start at current position plus one
            var newx = x ;
            do {
                newx += 1;
                newx = (newx == list.length ? 0 : newx) ;
                // console.log('newx: ' + newx) ;
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
        console.log("audio player loading: " + ret) ;
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
    // audio player event listeners. We first make sure there are no other
    // event listeners in place before setting our  own
    $scope.audio
        .off("ended")
        .off("pause")
        .off("playing")
        .on("ended", function() {
        var current_rec = $(this).attr("src") ;
        console.log("Player ended. " + current_rec) ;
        $("li.phrase").each(function() {
            if($(this).attr("file") === current_rec) {
                console.log("Found just finished phrase") ;
                $(this).css("border","none") ;
            }
        }) ;
        $scope.setSourceToNext(current_rec) ;
    })
    .on("pause", function () {
        console.log("Player paused");
            $scope.nowPlaying = false;
    })
    .on("playing", function () {
            console.log("Player playing");
            $scope.nowPlaying = true;
            var now_playing = $(this).attr("src") ;
            $("li.phrase").each(function() {
                if($(this).attr("file") === now_playing) {
                    console.log("Found playing phrase") ;
                    $(this).css("border","1px solid lightgrey") ;
                    // at this stage we need to ensure that the
                    // current element is visible
                    var elementRect = $(this)[0].getBoundingClientRect() ;

                    console.log("Bounding rectangle: Top: " + elementRect.top + ", bottom: " + elementRect.bottom) ;
                    var lyricPanelPosition = $scope.lyric_panel.position() ;
                    var lyricPanelTop = lyricPanelPosition.top + $scope.lyric_panel.scrollTop() ;
                    var lyricPanelBottom = lyricPanelTop + $scope.lyric_panel.height() ;
                    console.log("Lyric panel. Top: " + lyricPanelPosition.top + ", scrollTop: " + $scope.lyric_panel.scrollTop()) ;
                    var lyricPanelOffset = $scope.lyric_panel.offset() ;
                    console.log("Lyric panel. Top: " + lyricPanelTop + ", bottom: " + lyricPanelBottom) ;
                    if(elementRect.top < lyricPanelTop) {
                        console.log("Need to scroll DOWN: " + ( lyricPanelTop - elementRect.top)) ;
                        $(this)[0].scrollIntoView(true, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
                    }
                    if(elementRect.bottom > lyricPanelBottom) {
                        console.log("Need to scroll UP: " + ( elementRect.bottom - lyricPanelBottom ) ) ;
                        $(this)[0].scrollIntoView(false, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
                    }
                }
                else {
                    $(this).css("border","none") ;
                }
            }) ;
    })
    .show();

    $scope.viewport_size = $(window).outerHeight(true) ;
    console.log("Viewport size: " + $scope.viewport_size) ;
    console.log("Footer height at end: " + $scope.footer.outerHeight()) ;
    // resize the lyrics_panel
    $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true)) ;
    // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
    // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
    $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height) ;
}) ;

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
        }, 5000) ;
        // document is now ready. need to activate angular now. We
        // do this so that controllers ( and therefore plugins )
        // are not accessed until after the ready event is received
        angular.bootstrap(document.body, [ 'nga-taonga-o-ngati-toa' ]) ;
        console.log('Received Event: ' + id);
    }
};

