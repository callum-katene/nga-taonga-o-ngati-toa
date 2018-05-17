
var angApp = angular.module("nga-taonga-o-ngati-toa", ["ngRoute"]).config(function($sceProvider) {
    // Completely disable SCE.  We do this so we can embed HTML in the
    // lyrics. This is not a security threat because it is a contained app
    $sceProvider.enabled(false);
});
// routeProvider is configured to control application routing. For eaach pattern it specifies
// the template html file to apply and the controller to use.
// tempPlateUrl either refers to the ng-templates in the html file, or a specific html file
angApp.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "home.html", controller: "home_controller" })
        .when("/moteatea.html", { templateUrl: "moteatea.html", controller: "controller" })
        .when("/karakia.html", { templateUrl: "karakia.html", controller: "controller" })
        .when("/haka.html", { templateUrl: "haka.html", controller: "controller" })
        .when("/pepeha.html", { templateUrl: "pepeha.html", controller: "controller" })
        .when("/waiata.html", { templateUrl: "waiata.html", controller: "controller" })
        .when("/tera_ia_nga_tai_o_honipaka.html", { templateUrl: "tera_ia_nga_tai_o_honipaka.html", controller: "player2" })
        .when("/e_whatoro_ana.html", { templateUrl: "e_whatoro_ana.html", controller: "player2" })
        .when("/nau_mai_e_nga_hua.html", { templateUrl: "nau_mai_e_nga_hua.html", controller: "player2" })
        .when("/unuhia.html", { templateUrl: "unuhia.html", controller: "player2" })
        .when("/te_roa_o_te_po.html", { templateUrl: "te_roa_o_te_po.html", controller: "player2" })
        .when("/toea_mai_ra.html", { templateUrl: "toea_mai_ra.html", controller: "player2" })
        .when("/moe_hurihuri.html", { templateUrl: "moe_hurihuri.html", controller: "player2" })
        .when("/e_tu_ana.html", { templateUrl: "e_tu_ana.html", controller: "music_player" })
        .when("/iti_whetu.html", { templateUrl: "iti_whetu.html", controller: "music_player" })
        .when("/taku_toroa.html", { templateUrl: "taku_toroa.html", controller: "music_player" })
        .when("/i_nga_ra_o_mua.html", { templateUrl: "i_nga_ra_o_mua.html", controller: "music_player" })
        .when("/ka_oho_te_wairua.html", { templateUrl: "ka_oho_te_wairua.html", controller: "music_player" })
        .when("/he_hokioi.html", { templateUrl: "he_hokioi.html", controller: "player2" })
        .when("/ka_tukituki.html", { templateUrl: "ka_tukituki.html", controller: "player2" })
        .when("/kikiki_kakaka.html", { templateUrl: "kikiki_kakaka.html", controller: "player2" })
        .when("/tau_mai_e_kapiti.html", { templateUrl: "tau_mai_e_kapiti.html", controller: "player2" })
        .when("/whakatauki.html", { templateUrl: "whakatauki2.html", controller: "whakatauki_player" })
        .when("/takapuwahia.html", { templateUrl: "takapuwahia.html", controller: "player2" })
        .when("/hongoeka.html", { templateUrl: "hongoeka.html", controller: "player2" })
        .when("/p_help.html", { templateUrl: "player_help.html", controller: "player_help" })
        .when("/koata.html", { templateUrl: "koata.html", controller: "player2" })
        .otherwise({  redirectTo: '/' }) ;
}) ;

angApp.controller("player_help", function($scope, $window) {
    $('footer').hide() ;
    console.log('Player help controller') ;

    var outer_height = $(window).outerHeight(true) ;
    var outer_width = $(window).outerWidth(true) ;
    $('.title').click(function() {
        $window.history.go(-1) ;
    }) ;

    $scope.$on('$destroy', function() {
        $('footer').show() ;
    }) ;
    console.log("outer_height: " + outer_height) ;
    $('li > img').height(outer_height * .05) ;
    $('div.title > img').height(outer_height * .05) ;
    var font_size = '18px' ;
    if(outer_height > 1300 ) {
        font_size = '40px' ;
    }
    else if(outer_height > 1100) {
        font_size = '33px' ;
    }
    else if(outer_height > 900) {
        font_size = '26px' ;
    }
    else if(outer_height < 600) {
        font_size = '12px' ;
    }
    console.log('Setting font size to ' + font_size) ;
    $('p,li').css('font-size', font_size) ;
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
        setTimeout(function() {
            $('.menuitem').animate({ width: "80%" }, { duration: "normal" } ) ;
        }, 100) ;
    }, function(v) {
        console.log("error: " + v);
    }) ;

    $scope.footer = $("footer") ;
    $scope.navigation_bar = $('.navigation_bar') ;
    // $scope.footer.height(52) ;
    $(".player_control").hide() ;
    $window.plugins.insomnia.allowSleepAgain() ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
        // $scope.$apply() ;
    } ;
    // if this controller loads it is because we're on a menu page, so
    // ensure the header is visible and the audio player is hidden
    $("#header_image").css("display","block") ;
    $('body').addClass('background') ;
    $('#navigate_back').show() ;

    var outer_height = $(window).outerHeight(true) ;
    console.log("outer_height: " + outer_height) ;
    $('.navigation_entry').height(outer_height * .05) ;
    var font_size = '18px' ;
    if(outer_height > 1300 ) {
        font_size = '40px' ;
    }
    else if(outer_height > 1100) {
        font_size = '33px' ;
    }
    else if(outer_height > 900) {
        font_size = '26px' ;
    }
    else if(outer_height < 600) {
        font_size = '12px' ;
    }
    console.log('Setting font size to ' + font_size) ;
    $('.menu').css('font-size', font_size) ;
    //
    // $('.navigation_entry > img').height($(window).outerHeight(true) * .1) ;
    // if this controller is active then we are on a menu page
    // so the audio player needs to be paused, hidden, and event
    // listeners disabled


    $("audio")
        .off("ended")
        .off("playing")
        .off("paused")
        .hide()
        [0].pause() ;

    $('.navigation_bar').show() ;

    $scope.$on('$destroy', function() {
        $scope.navigation_bar.hide() ;
    }) ;

}) ;

angApp.controller("home_controller", function($scope, $http, $window, $location) {
    console.log("home controller") ;
    $('.navigation_bar').hide() ;

    $http.get("res/main_menu.json").then(function (v) {
        console.log("main_menu JSON loaded successfully") ;
        $scope.menuitems = v.data ;
        setTimeout(function() {
            $('.menuitem').animate({ width: "80%" }, { duration: "normal" } ) ;

        }, 100) ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    $scope.footer = $("footer") ;
    $(".player_control").hide() ;
    $window.plugins.insomnia.allowSleepAgain() ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
        return null ;
    } ;
    $scope.help_click_handler = function() {
        setTimeout(function() {
            $location.path = 'p_help.html' ;
        }, 100) ;
    } ;
    $('#player_help').off().on('click', $scope.help_click_handler) ;
    //

    // if this controller loads it is because we're on a menu page, so
    // ensure the header is visible and the audio player is hidden
    $("#header_image").css("display","block") ;
    $('body').addClass('background') ;
    $('#navigate_back').hide() ;
    var outer_height = $(window).outerHeight(true) ;
    console.log("outer_height: " + outer_height) ;
    $('.navigation_entry > img').height(outer_height * .05) ;
    var font_size = '18px' ;
    if(outer_height > 1300 ) {
        font_size = '40px' ;
    }
    else if(outer_height > 1100) {
        font_size = '33px' ;
    }
    else if(outer_height > 900) {
        font_size = '26px' ;
    }
    else if(outer_height < 600) {
        font_size = '12px' ;
    }
    console.log('Setting font size to ' + font_size) ;
    $('.menu').css('font-size', font_size) ;
    // $('.navigation_bar').show() ;
    //
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

angApp.controller("music_player", function($scope, $http, $window, $location) {
    console.log("music_player controller");
    // this player manages two audio elements.
    // if a phrase is selected/deselected, and an audio is currently playing
    // then the source of the OTHER audio is set to the next file to be played
    // if there is no audio currently playing, then just work with the
    // currently selected player
    $scope.nowPlaying = null;
    $scope.audio1 = $('#player1'); // the first player
    $scope.audio2 = $('#player2'); // the second player
    $scope.audio1.attr("src", null)[0].load();
    $scope.audio2.attr("src", null)[0].load();
    $scope.audio = $scope.audio1; // the current player, initially set to player 1
    $scope.footer = $("footer");
    $scope.song_title = $(".song_title");
    $window.plugins.insomnia.keepAwake();
    $scope.lyric_panel = $(".lyric_panel");
    $scope.navigation_bar = $('.navigation_bar');
    $scope.goTo = function (url) {
        console.log("Going to: " + url);
        $location.path(url);
        $scope.$apply();
        return null;
    };
    $("#header_image").css("display", "none");
    $('body').removeClass('background');
    $scope.player_all = function() {
        $scope.selectAllPhrases() ;
        $scope.setSourceToFirst() ;
    } ;
    $scope.player_none = function() {
        $scope.unselectAllPhrases() ;
    } ;
    $scope.font_larger = function() {
        console.log('Font larger') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size + 1) ;
        $scope.centre_phrases() ;
    } ;
    $scope.font_smaller = function() {
        console.log('Font smaller') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size - 1) ;
        $scope.centre_phrases() ;
    } ;
    $('#player_help').show() ;
    $('#font_larger').show().click($scope.font_larger) ;
    $('#font_smaller').show().click($scope.font_smaller) ;

    $scope.$on('$destroy', function() {
        console.log("$destroy event received") ;
        $scope.navigation_bar.hide() ;
        $("#player_all").off('click', $scope.player_all) ;
        $("#player_none").off('click', $scope.player_none) ;
        $('#font_larger').off('click', $scope.font_larger) ;
        $('#font_smaller').off('click', $scope.font_smaller) ;
        // $('#player_help').click(null) ;
    }) ;

    var storage = $window.localStorage ;
    var player_help = storage.getItem('player_help') ;
    if(player_help != 'true') {
        console.log('Did not find player_gelp flag so showing popup') ;
        // setTimeout(function() {
        //     alert('For help with this page touch the question mark (?) icon below') ;
        // }, 1000) ;
        navigator.notification.alert("For help regarding how to use this page, touch the question mark (?) icon in the navigation bar below",
            null, 'Help', "OK") ;
        storage.setItem('player_help', 'true') ;
    }
    else {
        console.log('player_help flag found so help must have been seen already') ;
    }

    // centre phrases vertically
    $scope.centre_phrases = function() {
        var lyric_panel_height = $scope.lyric_panel.height() ;
        var content_panel_height = $scope.viewport_size - $scope.footer.outerHeight(true) ;
        var diff = content_panel_height - ( $scope.song_title.outerHeight(true) + lyric_panel_height) ;
        if(diff > 0) {
            console.log('Setting lyric panel margin to ' + diff / 2) ;
            $scope.lyric_panel.animate({marginTop:diff / 2}, "normal") ;
        }
    } ;

    $scope.navigation_bar.show();
    // this loads the lyrics so sets up the page components hopefully after it's
    // finished the page will be rendered correctly
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;
        console.log('Spacing hack for Tau Mai E Kāpiti');
        $("li[file$='tau_mai_e_kapiti_22.mp3']").addClass('last-phrase');
        $("li[file$='tau_mai_e_kapiti_15.mp3']").addClass('last-phrase');
        $("li[file$='tau_mai_e_kapiti_8.mp3']").addClass('last-phrase');
        $scope.viewport_size = $(window).outerHeight(true);
        console.log("Viewport size: " + $scope.viewport_size);
        console.log("Footer height at end: " + $scope.footer.outerHeight());
        // resize the lyrics_panel
        $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true));
        // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
        // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
        $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height);
        // var content_panel_height = $scope.viewport_size - $scope.footer.outerHeight(true) ;
        // $('#content_panel').css('min-height', content_panel_height).css('max-height', content_panel_height) ;

        //
        // vertical centre, but give the phrases a chance to render first
        setTimeout(function() {
            $scope.centre_phrases() ;
        }, 300) ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
    // init_audio is designed to be called after the
    // song phrases have been loaded. uses an ng-init
    // in the ul. this should be fine with dual players
    // if it's only used after first load
    $scope.init_audio = function(first_file) {
        console.log("First song file: " + first_file);
        if(first_file) {
            $scope.audio1.attr("src", first_file) ;
            $scope.audio1[0].load() ;
            $scope.audio1.show() ;
        }
    } ;
}) ;

angApp.controller("whakatauki_player", function($scope, $http, $window, $location) {
    $scope.nowPlaying = null ;
    $scope.audio1 = $('#player1') ; // the first player
    $scope.audio2 = $('#player2') ; // the second player
    $scope.audio1.attr("src", null)[0].load() ;
    $scope.audio2.attr("src", null)[0].load() ;
    $scope.audio = $scope.audio1 ; // the current player, initially set to player 1
    $scope.footer = $("footer") ;
    $scope.song_title = $(".song_title") ;
    $window.plugins.insomnia.keepAwake() ;
    $scope.lyric_panel = $(".lyric_panel") ;
    $scope.navigation_bar = $('.navigation_bar') ;
    console.log("This is the whakatauki player") ;
    $("#header_image").css("display","none") ;
    $('body').removeClass('background') ;

    $scope.player_all = function() {
        $scope.selectAllPhrases() ;
        $scope.setSourceToFirst() ;
    } ;
    $scope.player_none = function() {
        $scope.unselectAllPhrases() ;
    } ;
    $scope.font_larger = function() {
        console.log('Font larger') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size + 1) ;
        $scope.centre_phrases() ;
    } ;
    $scope.font_smaller = function() {
        console.log('Font smaller') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size - 1) ;
        $scope.centre_phrases() ;
    } ;
    $('#player_help').show() ;

    $("#player_all").hide() ;
    $("#player_none").hide() ;
    $('#font_larger').show().click($scope.font_larger) ;
    $('#font_smaller').show().click($scope.font_smaller) ;
    $('#navigate_back').show() ;

    $scope.$on('$destroy', function() {
        console.log("$destroy event received") ;
        $scope.navigation_bar.hide() ;
        $("#player_all").off('click', $scope.player_all) ;
        $("#player_none").off('click', $scope.player_none) ;
        $('#font_larger').off('click', $scope.font_larger) ;
        $('#font_smaller').off('click', $scope.font_smaller) ;
        // $('#player_help').click(null) ;
    }) ;

    var storage = $window.localStorage ;
    var player_help = storage.getItem('player_help') ;
    if(player_help != 'true') {
        console.log('Did not find player_help flag so showing popup') ;
        // setTimeout(function() {
        //     alert('For help with this page touch the question mark (?) icon below') ;
        // }, 1000) ;
        navigator.notification.alert("For help regarding how to use this page, touch the question mark (?) icon in the navigation bar below",
            null, 'Help', "OK") ;
        storage.setItem('player_help', 'true') ;
    }
    else {
        console.log('player_help flag found so help must have been seen already') ;
    }

    // centre phrases vertically
    $scope.centre_phrases = function() {
        var lyric_panel_height = $scope.lyric_panel.height() ;
        var content_panel_height = $scope.viewport_size - $scope.footer.outerHeight(true) ;
        var diff = content_panel_height - ( $scope.song_title.outerHeight(true) + lyric_panel_height) ;
        if(diff > 0) {
            console.log('Setting lyric panel margin to ' + diff / 2) ;
            $scope.lyric_panel.animate({marginTop:diff / 2}, "normal") ;
        }
    } ;

    // THIS is where the footer height gets set, by setting
    // the height navigation entry to 5% of the outer height
    var outer_height = $(window).outerHeight(true) ;
    console.log("outer_height: " + outer_height) ;
    $('.navigation_entry').height(outer_height * .05) ;
    $scope.navigation_bar.show() ;
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;
        $scope.viewport_size = $(window).outerHeight(true);
        console.log("Viewport size: " + $scope.viewport_size);
        console.log('$scope.footer.outerHeight(true): ' + $scope.footer.outerHeight(true)) ;
        console.log('$scope.song_title.outerHeight(true): ' + $scope.song_title.outerHeight(true)) ;
        console.log("Footer height at end: " + $scope.footer.outerHeight());
        // resize the lyrics_panel
        $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true));

        // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
        // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
        $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height);
        console.log('$scope.max_lyric_panel_height: ' + $scope.max_lyric_panel_height) ;

        //
        // vertical centre, but give the phrases a chance to render first
        setTimeout(function() {
            $scope.centre_phrases() ;
        }, 300) ;
    }, function(v) {
        console.log("error: " + v);
    }) ;

    $(".phrase div:nth-child(1)").addClass("ingarihi") ;
}) ;

angApp.controller("player2", function($scope, $http, $window, $location) {
    console.log("player2 controller");
    // this player manages two audio elements.
    // if a phrase is selected/deselected, and an audio is currently playing
    // then the source of the OTHER audio is set to the next file to be played
    // if there is no audio currently playing, then just work with the
    // currently selected player
    $scope.nowPlaying = null ;
    $scope.audio1 = $('#player1') ; // the first player
    $scope.audio2 = $('#player2') ; // the second player
    $scope.audio1.attr("src", null)[0].load() ;
    $scope.audio2.attr("src", null)[0].load() ;
    $scope.audio = $scope.audio1 ; // the current player, initially set to player 1
    $scope.footer = $("footer") ;
    $scope.song_title = $(".song_title") ;
    $window.plugins.insomnia.keepAwake() ;
    $scope.lyric_panel = $(".lyric_panel") ;
    $scope.navigation_bar = $('.navigation_bar') ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
        $scope.$apply() ;
        return null ;
    } ;
    $("#header_image").css("display","none") ;
    $('body').removeClass('background') ;
    $scope.player_all = function() {
        $scope.selectAllPhrases() ;
        $scope.setSourceToFirst() ;
    } ;
    $scope.player_none = function() {
        $scope.unselectAllPhrases() ;
    } ;
    $scope.font_larger = function() {
        console.log('Font larger') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size + 1) ;
        $scope.centre_phrases() ;
    } ;
    $scope.font_smaller = function() {
        console.log('Font smaller') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size - 1) ;
        $scope.centre_phrases() ;
    } ;
    $('#player_help').show() ;

    $("#player_all").show().click($scope.player_all) ;
    $("#player_none").show().click($scope.player_none) ;
    $('#font_larger').show().click($scope.font_larger) ;
    $('#font_smaller').show().click($scope.font_smaller) ;

    $scope.$on('$destroy', function() {
        console.log("$destroy event received") ;
        $scope.navigation_bar.hide() ;
        $("#player_all").off('click', $scope.player_all) ;
        $("#player_none").off('click', $scope.player_none) ;
        $('#font_larger').off('click', $scope.font_larger) ;
        $('#font_smaller').off('click', $scope.font_smaller) ;
        // $('#player_help').click(null) ;
    }) ;

    var storage = $window.localStorage ;
    var player_help = storage.getItem('player_help') ;
    if(player_help != 'true') {
        console.log('Did not find player_gelp flag so showing popup') ;
        // setTimeout(function() {
        //     alert('For help with this page touch the question mark (?) icon below') ;
        // }, 1000) ;
        navigator.notification.alert("For help regarding how to use this page, touch the question mark (?) icon in the navigation bar below",
            null, 'Help', "OK") ;
        storage.setItem('player_help', 'true') ;
    }
    else {
        console.log('player_help flag found so help must have been seen already') ;
    }

    // centre phrases vertically
    $scope.centre_phrases = function() {
        var lyric_panel_height = $scope.lyric_panel.height() ;
        var content_panel_height = $scope.viewport_size - $scope.footer.outerHeight(true) ;
        var diff = content_panel_height - ( $scope.song_title.outerHeight(true) + lyric_panel_height) ;
        if(diff > 0) {
            console.log('Setting lyric panel margin to ' + diff / 2) ;
            $scope.lyric_panel.animate({marginTop:diff / 2}, "normal") ;
        }
    } ;

    // function to get the active audio player if no audio is playing,
    // or the inactive audio player if audio is playing
    $scope.getAudio = function() {
        var ret = null ;
        // console.log("Audio 1: " + JSON.stringify($scope.audio1)) ;
        var p = $scope.getCurrentlyPlaying() ;
        // console.log("Returned from getCurrentPlaying: " + JSON.stringify(p)) ;
        if(p === null) {
            ret = $scope.getCurrentlyVisible() ;
            // console.log("Returned from getCurrentlyVisible: " + JSON.stringify(p)) ;
        }
        else {
            if(p.is($scope.audio1)) {
                ret = $scope.audio2 ;
            }
            else if(p.is($scope.audio2)) {
                ret = $scope.audio1 ;
            }
            else {
                console.log("Should never get here") ;
                alert("Error. Please advise the developer") ;
            }
        }
        return ret ;
    } ;

    $scope.switchPlayers = function(currentPlayer) {
        // console.log('switching players. Current player: ' + JSON.stringify(currentPlayer)) ;
        var otherPlayer = null ;
        if(currentPlayer.is($scope.audio1)) {
            console.log("Other player is audio2") ;
            otherPlayer = $scope.audio2 ;
        }
        else if(currentPlayer.is($scope.audio2)) {
            console.log("Other player is audi01") ;
            otherPlayer = $scope.audio1 ;
        }
        else {
            alert('Error code 101') ;
        }
        // console.log('Other player: ' + JSON.stringify(otherPlayer)) ;
        var other_player_src =  otherPlayer.attr('src') ;
        if(other_player_src) {
            console.log("Other player SRC: " + other_player_src) ;
            var other_selected_phrase = $('ul > li [file="' + other_player_src +'"]') ;
            if ( other_selected_phrase.hasClass('unselected_phrase')) {
                console.log("Other player's selected phrase is no longer selected. Will not play") ;
                other_player.attr("src", null) ;
            }
            else {
                console.log("Phrase does not have unselected_phrase class, so playing") ;
                currentPlayer.hide() ;
                otherPlayer.show() ;
                otherPlayer[0].play() ;
            }
        }
        else {
            console.log("Other player has no audio") ;
        }
    } ;
    // getCurrentlyPlaying returns the audio element that is
    // currently playing, or null if neither is
    $scope.getCurrentlyPlaying = function() {
        var ret = null ;
        return $scope.nowPlaying ;
        // if(! $scope.audio1[0].paused ) {
        //     console.log("Audio1 is playing") ;
        //     ret = $scope.audio1 ;
        // }
        // else if (! $scope.audio2[0].paused ) {
        //     ret = $scope.audio2 ;
        //     console.log("Audio2 is playing") ;
        // } ;
        // if(ret === null) {
        //     console.log("Not currently playing") ;
        // }
        // return ret ;
    } ;

    // getCurrentlyVisible returns the audio element that
    // is currently visible
    $scope.getCurrentlyVisible = function() {
        var ret = null ;
        if($scope.audio1.is(':visible')) {
            console.log("audio1 is currently visible") ;
            ret = $scope.audio1 ;
        }
        else if($scope.audio2.is(':visible')) {
            console.log("audio1 is currently visible") ;
            ret = $scope.audio2 ;
        }
        else {
            console.log("Neither are visible???") ;
        }
        $scope.audio = ret ;
        return ret ;
    } ;

    // init_audio is designed to be called after the
    // song phrases have been loaded. uses an ng-init
    // in the ul. this should be fine with dual players
    // if it's only used after first load
    $scope.init_audio = function(first_file) {
        console.log("First song file: " + first_file);
        if(first_file) {
            $scope.audio1.attr("src", first_file) ;
            $scope.audio1[0].load() ;

        }
    } ;
    // function to set the first audio source to the first selected phrase
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
                $(this).css("border","none").css("font-weight","normal").css("background-color","black") ;
            }
            // $(this).css("border","none") ;
        });
        console.log("Player2 controller. nowPlaying: " + $scope.nowPlaying) ;
        // if(! $scope.nowPlaying) {
        //     $scope.audio.attr("src", null) ;
        //     $scope.audio[0].load() ;
        // }
        // else {
        //     $scope.audio.stop() ;
        // }

        // unselecting all stops play immediately
        $scope.audio1.stop() ;
        $scope.audio1.attr("src", null)[0].load() ;
        $scope.audio2.stop() ;
        $scope.audio2.attr("src", null)[0].load() ;

    } ;

    $scope.getNextSource = function(current_rec) {
        //loop through to find the phrase with this rec
        console.log("getNextSource. Looking for " + current_rec) ;
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
                if(!list.eq(newx).hasClass("unselected_phrase") && list.eq(newx).text() != '-----') {
                    console.log("Found selected phrase at " + newx) ;
                    ret = list.eq(newx).attr("file") ;
                }
                else {
                    console.log("item at position " + newx + " is unselected") ;
                }
            } while (ret === null && newx !== x) ;
        }
        return ret ;
    } ;
    //
    // function to set audio source to next
    // setSourceToNext takes an audio filename, gets the
    // next file name to play. If there is a next
    // then
    // if playing then set and load the inactive player
    // else set and load the visible player
    $scope.setSourceToNext = function(current_rec) {
        console.log("setSourceToNext. Looking for: " + current_rec) ;
        var ret = $scope.getNextSource(current_rec) ;
        if(ret !== null) {
            console.log("Found next audio: " + ret) ;
        }
        else {
            console.log("No next audio found") ;
        }
        var au = $scope.getAudio() ;
        if(au === null) {
            console.log("Should never get here") ;
            alert("Error: Please advise the developer. Code 3") ;
        }
        else {
            au.attr("src", ret) ;
            au[0].load() ;
        }
    } ;

    //
    // doToggle function adds or removes the unselected_phrase class
    // from a phrase.
    $scope.doToggle = function(val) {
        var myEl = $("ul li").eq(val) ;
        if(myEl.text() === '-----') {
            console.log('Spacer') ;
        }
        else {
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
            else {
                console.log("currently playing so need to set OTHER audio src") ;
                $scope.setSourceToNext($scope.nowPlaying.attr('src')) ;
            }
        }
    } ;
    //
    // audio player event listeners. We first make sure there are no other
    // event listeners in place before setting our  own
    $scope.audioEnded = function() {
        var current_rec = $(this).attr("src") ;
        console.log("Player ended. " + current_rec) ;
        $scope.switchPlayers($(this)) ;

        $("li.phrase").each(function() {
            if($(this).attr("file") === current_rec) {
                console.log("Found just finished phrase") ;
                // $(this).css("border","none").css("font-weight","normal") ;
                $(this).css("border","none").css("font-weight","normal").css("background-color","black") ;
            }
        }) ;
        // $scope.setSourceToNext(current_rec) ;
    } ;
    $scope.audioPaused = function () {
        console.log("Player paused");
        $scope.nowPlaying = null;
    } ;
    $scope.audioPlaying = function () {

        // console.log("Player playing: " + JSON.stringify($(this)));
        $scope.nowPlaying = $(this);
        var now_playing = $scope.getCurrentlyPlaying().attr("src") ;
        console.log("File currently playing: " + now_playing) ;
        $("li.phrase").each(function() {
            if($(this).attr("file") === now_playing) {
                console.log("Found playing phrase") ;
                // $(this).attr("style='border:1px solid white;font-weight:bold;background-color:gray'") ;
                $(this).css("border","1px solid white").css("font-weight","bold").css("background-color","#404040") ;
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
                if(elementRect.top <= lyricPanelTop) {
                    console.log("Need to scroll DOWN: " + ( lyricPanelTop - elementRect.top)) ;
                    $(this)[0].scrollIntoView(true, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
                }
                console.log("ElementRec:BOTTOM " + elementRect.bottom + ", LyricPanel:BOTTOM " + lyricPanelBottom) ;
                if(elementRect.bottom  >= lyricPanelBottom) {
                    console.log("Need to scroll UP: " + ( elementRect.bottom - lyricPanelBottom ) ) ;
                    $(this)[0].scrollIntoView(true, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
                }
            }
            else {
                $(this).css("border","none") ;
            }
        }) ;
        // playing has started so set the src
        $scope.setSourceToNext(now_playing) ;
    } ;

    $scope.audio1
        .off("ended")
        .off("pause")
        .off("playing")
        .on("ended", $scope.audioEnded)
        .on("pause", $scope.audioPaused)
        .on("playing", $scope.audioPlaying)
        .attr("src",null)
        .show();
    $scope.audio2
        .off("ended")
        .off("pause")
        .off("playing")
        .on("ended", $scope.audioEnded)
        .on("pause", $scope.audioPaused)
        .on("playing", $scope.audioPlaying)
        .attr("src",null)
        .hide();

    $scope.navigation_bar.show();
    // this loads the lyrics so sets up the page components hopefully after it's
    // finished the page will be rendered correctly
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully") ;
        $scope.menuitems = v.data ;
        console.log('Spacing hack for Tau Mai E Kāpiti');
        $("li[file$='tau_mai_e_kapiti_22.mp3']").addClass('last-phrase');
        $("li[file$='tau_mai_e_kapiti_15.mp3']").addClass('last-phrase');
        $("li[file$='tau_mai_e_kapiti_8.mp3']").addClass('last-phrase');
        $scope.viewport_size = $(window).outerHeight(true);
        console.log("Viewport size: " + $scope.viewport_size);
        console.log("Footer height at end: " + $scope.footer.outerHeight());
        // resize the lyrics_panel
        $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true));
        // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
        // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
        $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height);
        // var content_panel_height = $scope.viewport_size - $scope.footer.outerHeight(true) ;
        // $('#content_panel').css('min-height', content_panel_height).css('max-height', content_panel_height) ;

        //
        // vertical centre, but give the phrases a chance to render first
        setTimeout(function() {
            $scope.centre_phrases() ;
        }, 300) ;
    }, function(v) {
        console.log("error: " + v);
    }) ;
}) ;

// // app is used by the cordova initialization
// var intro = false ;
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
        // $(window).scroll(function(ev) {
        //     console.log('Scroll: ' + JSON.stringify(ev)) ;
        // }) ;
        // var manager = new Hammer.Manager($('body')[0]) ;
        // var swipe = new Hammer.Swipe() ;
        // manager.add(swipe) ;
        // manager.on('swipe', function(e) {
        //     console.log('Swipe: ' + e) ;
        // }) ;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        // $(".listening").text("Device ready")  ;
        // // $(".listening").css('display', 'none') ;
        // setInterval(function() {
        //     $("p.listening").css("display",'none') ;
        // }, 5000) ;
        // document is now ready. need to activate angular now. We
        // do this so that controllers ( and therefore plugins )
        // are not accessed until after the ready event is received
        angular.element(function() {
            angular.bootstrap(document, ['nga-taonga-o-ngati-toa']) ;
        })
     }
};
//
