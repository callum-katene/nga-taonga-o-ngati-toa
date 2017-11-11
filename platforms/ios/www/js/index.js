
var angApp = angular.module("nga-taonga-o-ngati-toa", ["ngRoute"]);
// routeProvider is configured to control application routing. For eaach pattern it specifies
// the template html file to apply and the controller to use.
// tempPlateUrl either refers to the ng-templates in the html file, or a specific html file
angApp.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "top.html", controller: "home_controller" })
        .when("/whakatauki.html", { templateUrl: "whakatauki.html", controller: "controller" })
        .when("/moteatea.html", { templateUrl: "moteatea.html", controller: "controller" })
        .when("/karakia.html", { templateUrl: "karakia.html", controller: "controller" })
        .when("/haka.html", { templateUrl: "haka.html", controller: "controller" })
        .when("/pepeha.html", { templateUrl: "pepeha.html", controller: "controller" })
        .when("/waiata.html", { templateUrl: "waiata.html", controller: "controller" })
        .when("/tera_ia_nga_tai_o_honipaka.html", { templateUrl: "tera_ia_nga_tai_o_honipaka.html", controller: "player2" })
        .when("/e_whatoro_ana.html", { templateUrl: "e_whatoro_ana.html", controller: "player" })
        .when("/te_roa_o_te_po.html", { templateUrl: "te_roa_o_te_po.html", controller: "player" })
        .when("/toea_mai_ra.html", { templateUrl: "toea_mai_ra.html", controller: "player" })
        .when("/moe_hurihuri.html", { templateUrl: "moe_hurihuri.html", controller: "player" })
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
    $scope.navigation_bar = $('.navigation_bar') ;
    // $scope.footer.height(52) ;
    $(".player_control").hide() ;
    $window.plugins.insomnia.allowSleepAgain() ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
    } ;
    // if this controller loads it is because we're on a menu page, so
    // ensure the header is visible and the audio player is hidden
    $("#header_image").css("display","block") ;
    $('body').addClass('background') ;
    $('#navigate_back').show() ;

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
    }, function(v) {
        console.log("error: " + v);
    }) ;
    $scope.footer = $("footer") ;
    $(".player_control").hide() ;
    $window.plugins.insomnia.allowSleepAgain() ;
    $scope.goTo = function(url) {
        console.log("Going to: " + url) ;
        $location.path(url) ;
    } ;
    //
    // initialise hammer

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

angApp.controller("player-cordova-plugin-nativeaudio", function($scope, $http, $window) {
    console.log("player-cordova-plugin-nativeaudio controller");
    $('audio').hide() ;
    $scope.footer = $("footer");
    $scope.song_title = $(".song_title");
    $window.plugins.insomnia.keepAwake();
    $scope.lyric_panel = $(".lyric_panel");
    $("#header_image").css("display", "none");
    $('body').removeClass('background');
    $scope.play_button = $('#player_play') ;
    $scope.pause_button = $('#player_pause') ;
    $scope.all_button = $('#player_all') ;
    $scope.none_button = $('#player_none') ;
    $scope.play_button.show() ;
    $scope.pause_button.hide() ;
    $scope.all_button.show().click(function() {
        $('li.phrase.unselected_phrase').removeClass('unselected_phrase') ;
    }) ;
    $scope.none_button.show().click(function() {
        $('li.phrase').not('.unselected_phrase').addClass('unselected_phrase') ;
    }) ;
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully");
        $scope.menuitems = v.data;
    }, function (v) {
        console.log("error: " + v);
    });

    $scope.current_file = null ;
    $scope.next_file = null ;
    $scope.is_paused = null ;
    $scope.recordings_file = [] ; // an array of the file names loaded
    // $scope.recordings_media = [] ; // an array of the media objects loaded
    $scope.audio_plugin = window.plugins.NativeAudio ;
    console.log('Native audio plugin loaded') ;

    // cleanup after controller is finished
    $scope.$on('$destroy', function() {
        console.log('$destroy: leaving controller player-cordova-plugin-nativeaudio') ;
        $scope.pause() ; // setting is_paused so the media listener doesn't try to restart playing
        $.each($scope.recordings_file, function(index, value) {
            console.log('Attempting to unload file ' + value) ;
            $scope.audio_plugin.unload(value,
                function(msg) {
                    console.log('Unload of ' + value + ' successful: ' + msg) ;
                },
                function(msg) {
                    console.log('Unload of ' + value + ' unsuccessful: ' + msg) ;
                }
            ) ;
        }) ;
        $scope.play_button.off('click') ;
        $scope.pause_button.off('click') ;
        $scope.play_button.hide() ;
        $scope.pause_button.hide() ;
        $scope.all_button.hide() ;
        $scope.none_button.hide() ;
        $scope.all_button.off('click') ;
        $scope.none_button.off('click') ;
        $window.plugins.insomnia.allowSleepAgain() ;
    }) ;


    $scope.get_media = function(file) {
        return $scope.recordings_media[$scope.recordings_file.indexOf(file)] ;
    } ;

    $scope.get_li = function(file) {
        var li = null ;
        if(file) {
            li = $('li.phrase[file="' + file +'"]').first() ;
        }
        else {
            li = $('li.phrase').not('.unselected_phrase').first() ;
        }
        console.log('get_li(): Returning: ' + li.attr('file')) ;
        return li ;
    } ;

    $scope.get_next_li = function(current_li) {
        var next_li = null ;
        console.log('get_next_li(): current_li file: ' + current_li.attr('file')) ;
        if(current_li) {
            next_li = current_li.nextAll('li.phrase').not('.unselected_phrase').first() ;
            console.log('get_next_li(): next_li file: ' + next_li.attr('file')) ;
        }
        if(! next_li.length) {
            console.log('Searching from the top') ;
            next_li = $('li.phrase').not('.unselected_phrase').first() ;
        }
        console.log('get_next_li(): returning: ' + next_li.attr('file')) ;
        return next_li ;
    } ;

    // action for the play button. if current_file is set then we get its media
    // and check to see if current position is less than duration. if it is then
    // resume. otherwise go to next.
    $scope.play = function() {
        console.log('Play. Current file is ' + $scope.current_file) ;
        $scope.is_paused = false ;
        var file_to_play = null ;
        var next_li = null ;
        $scope.play_button.hide() ;
        next_li = $scope.get_li($scope.current_file) ;
        if($scope.current_file) {
            next_li = $scope.get_next_li(next_li) ;
        }
        // next_li = $scope.get_next_li($scope.get_li($scope.current_file)) ;
        if(next_li) {
            file_to_play = next_li.attr('file') ;
        }
        if(!file_to_play) {
            console.log('No file to play. Triggering PAUSE ...') ;
            $scope.pause_button.trigger('click') ;
        }
        else {
            console.log('File to play: ' + file_to_play) ;
            $scope.audio_plugin.play(file_to_play,
                function(msg) {
                    console.log('File ' + file_to_play + ' now playing successfully: ' + msg) ;
                    $scope.current_file = file_to_play ;
                    $('li.phrase.playing').removeClass('playing');
                    $scope.get_li(file_to_play).addClass('playing');
                },
                function(msg) {
                    console.log('Could not initiate playing of file ' + file_to_play + ': ' + msg) ;
                },
                function(msg) {
                    console.log('Playing of file ' + file_to_play + ' has completed successfully: ' + msg) ;
                    //             console.log('File ' + file + 'has just stopped playing') ;
                    $('li.phrase.playing').removeClass('playing');
                    if ($scope.is_paused) {
                        console.log('Paused, so do nothing');
                    }
                    else {
                        // var next_li = $scope.get_next_li($scope.get_li(file)) ;
                        // if(!next_li) {
                        // couldn't get a next_li so pausing
                        //     $scope.pause_button.trigger('click') ;
                        // }
                        // else {
                        $scope.play_button.trigger('click');
                        // }
                    }
                }) ;
            // var media = $scope.get_media(file_to_play) ;
            // media.getCurrentPosition(function(position) {
            //     if(position > 0) {
            //         console.log('File ' + file_to_play + ' is not at the beginning, so resuming ...') ;
            //         media.play() ;
            //     }
            //     else {
            //         console.log('File ' + file_to_play + ' is at the beginning, so playing ...');
            //         media.play() ;
            //     }
            // }, function(err) {
            //     console.log('Unable to get current position: ' + err) ;
            // } ) ;

        }
        $scope.pause_button.show() ;
    } ;

    $scope.pause = function() {
        $scope.is_paused = true ;
        console.log('Pause. Current file: ' + $scope.current_file) ;
        // var current_file_index = $scope.recordings_file.indexOf($scope.current_file) ;
        // console.log('Pause. Index of file: ' + current_file_index) ;
        // var media = $scope.recordings_media[current_file_index] ;
        // if(media) {
        //     console.log('Media object found: ' + JSON.stringify(media)) ;
        //     media.pause() ;
        //     $scope.play_button.show() ;
        //     $scope.pause_button.hide() ;
        // }
        // else {
        //     console.log('Could not find media object for file: ' + $scope.current_file) ;
        // }
    } ;

    $scope.play_button.click($scope.play) ;
    $scope.pause_button.click($scope.pause) ;

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
    } ;

    // set the height of the view port and enable scrolling
    $scope.viewport_size = $(window).outerHeight(true) ;
    console.log("Viewport size: " + $scope.viewport_size) ;
    console.log("Footer height at end: " + $scope.footer.outerHeight()) ;
    // resize the lyrics_panel
    $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true)) ;
    // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
    // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
    $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height) ;

    // preload all audio. This is done after a 500mS timeout. There's
    // probably a better way to do this
    setTimeout(function() {
        $('li.phrase').each(function (index, value) {
            var file = $(this).attr('file') ;
            $scope.audio_plugin.preloadComplex(file, file, 1, 1, 0,
                function(msg) {
                    console.log('File ' + file + ' pre-loaded successfully: ' + msg) ;
                    $scope.recordings_file.push(file) ;
                },
                function(msg) {
                    console.log('File ' + file + ' pre-load failed: ' + msg) ;
                }) ;

            // $scope.recordings_media.push(new Media(file,
            //     function(msg) {
            //         console.log('Media success callback: ' + msg) ;
            //     }, function(msg) {
            //         console.log('Media failure callback: ' + JSON.stringify(msg)) ;
            //     }, function(msg) {
            //         console.log('Media status change callback: ' + msg) ;
            //         if(msg == 2) {
            //             console.log('Playback started: ' + file) ;
            //             $scope.current_file = file ;
            //             $('li.phrase.playing').removeClass('playing') ;
            //             $scope.get_li(file).addClass('playing') ;
            //         }
            //         if(msg == 4) {
            //             console.log('File ' + file + 'has just stopped playing') ;
            //             $('li.phrase.playing').removeClass('playing') ;
            //             if($scope.is_paused) {
            //                 console.log('Paused, so do nothing') ;
            //             }
            //             else {
            //                 // var next_li = $scope.get_next_li($scope.get_li(file)) ;
            //                 // if(!next_li) {
            //                 // couldn't get a next_li so pausing
            //                 //     $scope.pause_button.trigger('click') ;
            //                 // }
            //                 // else {
            //                 $scope.play_button.trigger('click') ;
            //                 // }
            //             }
            //         }
            //     })) ;
        }) ;
        console.log('Recordings count: ' + $scope.recordings_file.length) ;
        for(i=0; i < $scope.recordings_file.length; i++) {
            console.log('Recording file: ' + $scope.recordings_file[i]) ;
        }
    }, 500) ;

    //
} ) ;

angApp.controller("player-cordova-plugin-media", function($scope, $http, $window) {
    console.log("player-cordova-plugin-media controller");
    // this player manages to audio elements.
    // if a phrase is selected/deselected, and an audio is currently playing
    // then the source of the OTHER audio is set to the next file to be played
    // if there is no audio currently playing, then just work with the
    // currently selected player
    $('audio').hide() ;
    $scope.footer = $("footer");
    $scope.song_title = $(".song_title");
    $window.plugins.insomnia.keepAwake();
    $scope.lyric_panel = $(".lyric_panel");
    $("#header_image").css("display", "none");
    $('body').removeClass('background');
    $scope.play_button = $('#player_play') ;
    $scope.pause_button = $('#player_pause') ;
    $scope.all_button = $('#player_all') ;
    $scope.none_button = $('#player_none') ;
    $scope.play_button.show() ;
    $scope.pause_button.hide() ;
    $scope.all_button.show().click(function() {
        $('li.phrase.unselected_phrase').removeClass('unselected_phrase') ;
    }) ;
    $scope.none_button.show().click(function() {
        $('li.phrase').not('.unselected_phrase').addClass('unselected_phrase') ;
    }) ;
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully");
        $scope.menuitems = v.data;
    }, function (v) {
        console.log("error: " + v);
    });

    $scope.current_file = null ;
    $scope.next_file = null ;
    $scope.is_paused = null ;
    $scope.recordings_file = [] ; // an array of the file names loaded
    $scope.recordings_media = [] ; // an array of the media objects loaded


    $scope.$on('$destroy', function() {
        console.log('$destroy: leaving controller player-cordova-plugin-media') ;
        $scope.pause() ; // setting is_paused so the media listener doesn't try to restart playing
        $.each($scope.recordings_media, function(index, value) {
            console.log('Unloading media at position ' + index) ;
            value.stop() ;
            value.release() ;
        }) ;
        $scope.play_button.off('click') ;
        $scope.pause_button.off('click') ;
        $scope.play_button.hide() ;
        $scope.pause_button.hide() ;
        $scope.all_button.hide() ;
        $scope.none_button.hide() ;
        $scope.all_button.off('click') ;
        $scope.none_button.off('click') ;
    }) ;

    $scope.get_media = function(file) {
        return $scope.recordings_media[$scope.recordings_file.indexOf(file)] ;
    } ;

    $scope.get_li = function(file) {
        var li = null ;
        if(file) {
            li = $('li.phrase[file="' + file +'"]').first() ;
        }
        else {
            li = $('li.phrase').not('.unselected_phrase').first() ;
        }
        console.log('get_li(): Returning: ' + li.attr('file')) ;
        return li ;
    } ;

    $scope.get_next_li = function(current_li) {
        var next_li = null ;
        console.log('get_next_li(): current_li file: ' + current_li.attr('file')) ;
        if(current_li) {
           next_li = current_li.nextAll('li.phrase').not('.unselected_phrase').first() ;
            console.log('get_next_li(): next_li file: ' + next_li.attr('file')) ;
        }
        if(! next_li.length) {
            console.log('Searching from the top') ;
            next_li = $('li.phrase').not('.unselected_phrase').first() ;
        }
        console.log('get_next_li(): returning: ' + next_li.attr('file')) ;
        return next_li ;
    } ;

    // action for the play button. if current_file is set then we get its media
    // and check to see if current position is less than duration. if it is then
    // resume. otherwise go to next.
    $scope.play = function() {
        console.log('Play. Current file is ' + $scope.current_file) ;
        $scope.is_paused = false ;
        var file_to_play = null ;
        var next_li = null ;
        $scope.play_button.hide() ;
        next_li = $scope.get_li($scope.current_file) ;
        if($scope.current_file) {
            next_li = $scope.get_next_li(next_li) ;
        }
        // next_li = $scope.get_next_li($scope.get_li($scope.current_file)) ;
        if(next_li) {
            file_to_play = next_li.attr('file') ;
        }
        if(!file_to_play) {
            console.log('No file to play. Triggering PAUSE ...') ;
            $scope.pause_button.trigger('click') ;
        }
        else {
            console.log('File to play: ' + file_to_play) ;
            var media = $scope.get_media(file_to_play) ;
            media.getCurrentPosition(function(position) {
                if(position > 0) {
                    console.log('File ' + file_to_play + ' is not at the beginning, so resuming ...') ;
                    media.play() ;
                }
                else {
                    console.log('File ' + file_to_play + ' is at the beginning, so playing ...');
                    media.play() ;
                }
            }, function(err) {
                console.log('Unable to get current position: ' + err) ;
            } ) ;

        }
        $scope.pause_button.show() ;
    } ;

    $scope.pause = function() {
        $scope.is_paused = true ;
        console.log('Pause. Current file: ' + $scope.current_file) ;
        var current_file_index = $scope.recordings_file.indexOf($scope.current_file) ;
        console.log('Pause. Index of file: ' + current_file_index) ;
        var media = $scope.recordings_media[current_file_index] ;
        if(media) {
            console.log('Media object found: ' + JSON.stringify(media)) ;
            media.pause() ;
            $scope.play_button.show() ;
            $scope.pause_button.hide() ;
        }
        else {
            console.log('Could not find media object for file: ' + $scope.current_file) ;
        }
    } ;

    $scope.play_button.click($scope.play) ;
    $scope.pause_button.click($scope.pause) ;

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
    } ;

    // set the height of the view port and enable scrolling
    $scope.viewport_size = $(window).outerHeight(true) ;
    console.log("Viewport size: " + $scope.viewport_size) ;
    console.log("Footer height at end: " + $scope.footer.outerHeight()) ;
    // resize the lyrics_panel
    $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true)) ;
    // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
    // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
    $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height) ;

    // preload all audio. This is done after a 500mS timeout. There's
    // probably a better way to do this
    setTimeout(function() {
        $('li.phrase').each(function (index, value) {
            var file = $(this).attr('file') ;
            // console.log('Wanting to preload[' + index + '] ' + file);
            $scope.recordings_file.push(file) ;
            $scope.recordings_media.push(new Media(file,
                function(msg) {
                    console.log('Media success callback: ' + msg) ;
                }, function(msg) {
                    console.log('Media failure callback: ' + JSON.stringify(msg)) ;
                }, function(msg) {
                    console.log('Media status change callback: ' + msg) ;
                    if(msg == 2) {
                    console.log('Playback started: ' + file) ;
                    $scope.current_file = file ;
                    $('li.phrase.playing').removeClass('playing') ;
                    $scope.get_li(file).addClass('playing') ;
                }
                if(msg == 4) {
                    console.log('File ' + file + 'has just stopped playing') ;
                    $('li.phrase.playing').removeClass('playing') ;
                    if($scope.is_paused) {
                        console.log('Paused, so do nothing') ;
                    }
                    else {
                        // var next_li = $scope.get_next_li($scope.get_li(file)) ;
                        // if(!next_li) {
                            // couldn't get a next_li so pausing
                        //     $scope.pause_button.trigger('click') ;
                        // }
                        // else {
                            $scope.play_button.trigger('click') ;
                        // }
                    }
                }
            })) ;
        }) ;
        console.log('Recordings count: ' + $scope.recordings_file.length) ;
        for(i=0; i < $scope.recordings_file.length; i++) {
            console.log('Recording file: ' + $scope.recordings_file[i]) ;
        }
    }, 500) ;

    //
} ) ;


angApp.controller("player3", function($scope, $http, $window) {
    console.log("player3 controller");
    // this player manages to audio elements.
    // if a phrase is selected/deselected, and an audio is currently playing
    // then the source of the OTHER audio is set to the next file to be played
    // if there is no audio currently playing, then just work with the
    // currently selected player
    $scope.nowPlaying = null;
    $scope.audio1 = $('#player1'); // the first player
    $scope.audio1.attr("src", null)[0].load();
    $scope.audio = $scope.audio1;
    $scope.footer = $("footer");
    $scope.song_title = $(".song_title");
    $window.plugins.insomnia.keepAwake();
    $scope.lyric_panel = $(".lyric_panel");
    $("#header_image").css("display", "none");
    $('body').removeClass('background');
    //
    // load the lyrics
    $http.get("res/lyrics.json").then(function (v) {
        console.log("lyrics.JSON loaded successfully");
        $scope.menuitems = v.data;
    }, function (v) {
        console.log("error: " + v);
    });
    $scope.updateList = function () {
        console.log("updateList()");
    };

    $scope.setSourceToFirst = function () {
        console.log("setSourceToFirst()");
    };

    // doToggle function adds or removes the unselected_phrase class
    // from a phrase. This is called by ng-click in the html template
    $scope.doToggle = function (val) {
        var myEl = $("ul li").eq(val);
        if (myEl.hasClass("unselected_phrase")) {
            console.log("Selected element has unselected class so removing ...");
            myEl.removeClass("unselected_phrase");
        }
        else {
            myEl.addClass("unselected_phrase");
            console.log("Selected element does not have unselected class so adding ...");
        }
        if (!$scope.nowPlaying) {
            $scope.setSourceToFirst();
        }
        else {
            console.log("currently playing so need to set OTHER audio src");
            $scope.updateList($scope.nowPlaying.attr('src'));
        }
    };

    //
    // audio player event listeners. We first make sure there are no other
    // event listeners in place before setting our  own
    $scope.audioEnded = function () {
        console.log("Player ended. ");

        // $("li.phrase").each(function () {
        //     if ($(this).attr("file") === current_rec) {
        //         console.log("Found just finished phrase");
        //         // $(this).css("border","none").css("font-weight","normal") ;
        //         $(this).css("border", "none").css("font-weight", "normal").css("background-color", "black");
        //     }
        // });
        // $scope.setSourceToNext(current_rec) ;
    };
    $scope.audioPaused = function () {
        console.log("Player paused");
        $scope.nowPlaying = null;
    };
    $scope.audioPlaying = function () {
        $scope.nowPlaying = $(this);
        // var now_playing = $scope.getCurrentlyPlaying().attr("src");
        // console.log("File currently playing: " + now_playing);
        // $("li.phrase").each(function() {
        //     if($(this).attr("file") === now_playing) {
        //         console.log("Found playing phrase") ;
        //         // $(this).attr("style='border:1px solid white;font-weight:bold;background-color:gray'") ;
        //         $(this).css("border","1px solid white").css("font-weight","bold").css("background-color","#404040") ;
        //         // at this stage we need to ensure that the
        //         // current element is visible
        //         var elementRect = $(this)[0].getBoundingClientRect() ;
        //
        //         console.log("Bounding rectangle: Top: " + elementRect.top + ", bottom: " + elementRect.bottom) ;
        //         var lyricPanelPosition = $scope.lyric_panel.position() ;
        //         var lyricPanelTop = lyricPanelPosition.top + $scope.lyric_panel.scrollTop() ;
        //         var lyricPanelBottom = lyricPanelTop + $scope.lyric_panel.height() ;
        //         console.log("Lyric panel. Top: " + lyricPanelPosition.top + ", scrollTop: " + $scope.lyric_panel.scrollTop()) ;
        //         var lyricPanelOffset = $scope.lyric_panel.offset() ;
        //         console.log("Lyric panel. Top: " + lyricPanelTop + ", bottom: " + lyricPanelBottom) ;
        //         if(elementRect.top <= lyricPanelTop) {
        //             console.log("Need to scroll DOWN: " + ( lyricPanelTop - elementRect.top)) ;
        //             $(this)[0].scrollIntoView(true, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
        //         }
        //         console.log("ElementRec:BOTTOM " + elementRect.bottom + ", LyricPanel:BOTTOM " + lyricPanelBottom) ;
        //         if(elementRect.bottom  >= lyricPanelBottom) {
        //             console.log("Need to scroll UP: " + ( elementRect.bottom - lyricPanelBottom ) ) ;
        //             $(this)[0].scrollIntoView(true, { behavior: "smooth", block: "nearest", inline: "nearest"}) ;
        //         }
        //     }
        //     else {
        //         $(this).css("border","none") ;
        //     }
        // }) ;
    };

    $scope.audio1
        .off("ended")
        .off("pause")
        .off("playing")
        .on("ended", $scope.audioEnded)
        .on("pause", $scope.audioPaused)
        .on("playing", $scope.audioPlaying)
        .attr("src", null)
        .show();

    $scope.viewport_size = $(window).outerHeight(true);
    console.log("Viewport size: " + $scope.viewport_size);
    console.log("Footer height at end: " + $scope.footer.outerHeight());
    // resize the lyrics_panel
    $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true));
    // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
    // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
    $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height);
    //
    // now initialize the source elements of the auid player
    setTimeout(function() {
        $('li.phrase').each(function (v) {
            // $scope.audio1.append($(this).attr('file')) ;
            var s = '<source src="' + $(this).attr('file') + '" type="audio/mp3" id="source' + v + '" </source>' ;
            console.log(s);
            $scope.audio1.append(s) ;
        });
    }, 500) ;
}) ;

angApp.controller("player2", function($scope, $http, $window) {
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
    $("#header_image").css("display","none") ;
    $('body').removeClass('background') ;
    $scope.$on('$destroy', function() {
        $scope.navigation_bar.hide() ;
    }) ;

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
        if(otherPlayer.attr('src')) {
            console.log("Other player SRC: " + otherPlayer.attr('src')) ;
            currentPlayer.hide() ;
            otherPlayer.show() ;
            otherPlayer[0].play() ;
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
        console.log("nowPlaying: " + $scope.nowPlaying) ;
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
    $('#font_larger').show().click(function() {
        console.log('Font larger') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size + 1) ;
    }) ;
    $('#font_smaller').show().click(function() {
        console.log('Font smaller') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size - 1) ;
    }) ;


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
                if(!list.eq(newx).hasClass("unselected_phrase")) {
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

    $scope.viewport_size = $(window).outerHeight(true) ;
    console.log("Viewport size: " + $scope.viewport_size) ;
    console.log("Footer height at end: " + $scope.footer.outerHeight()) ;
    // resize the lyrics_panel
    $scope.max_lyric_panel_height = $scope.viewport_size - ( $scope.footer.outerHeight(true) + $scope.song_title.outerHeight(true)) ;
    // $scope.max_lyric_panel_height = footer_position.top - $scope.song_title.outerHeight(true) ;
    // console.log("Setting max lyric panel height to: " + $scope.max_lyric_panel_height) ;
    $scope.lyric_panel.css('max-height', $scope.max_lyric_panel_height) ;
    $scope.navigation_bar.show() ;
}) ;

angApp.controller("player", function($scope, $http, $window) {
    console.log("player controller") ;
    $scope.nowPlaying = false ;
    $scope.audio = $("#player1") ;
    $scope.footer = $("footer") ;
    $scope.song_title = $(".song_title") ;
    $window.plugins.insomnia.keepAwake() ;
    $scope.lyric_panel = $(".lyric_panel") ;
    $scope.navigation_bar = $('.navigation_bar') ;
    $("#header_image").css("display","none") ;
    $('body').removeClass('background') ;

    $scope.$on('$destroy', function() {
        $scope.navigation_bar.hide() ;
    }) ;
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
        console.log("nowPlaying: " + $scope.nowPlaying) ;
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
    $('#font_larger').show().click(function() {
        console.log('Font larger') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size + 1) ;
    }) ;
    $('#font_smaller').show().click(function() {
        console.log('Font smaller') ;
        var current_font_size = parseInt($('.phrase').css('font-size')) ;
        $('.phrase').css('font-size',current_font_size - 1) ;
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
                // $(this).css("border","none").css("font-weight","normal") ;
                $(this).css("border","none").css("font-weight","normal").css("background-color","black") ;
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
    })
    .show();
    $scope.navigation_bar.show() ;
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
        var hammer_options = "" ;
        var hammertime = new Hammer($('body')[0]) ;
        hammertime.on('pan', function(ev) {
            console.log("Hammertime: " + JSON.stringify(ev)) ;
        })
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
        angular.bootstrap(document.body, [ 'nga-taonga-o-ngati-toa' ]) ;
        $('body').prepend("<video src='img/marae2.mov' width='100%' height='100%' autoplay> No video support</video>") ;
        $('video').click(function() {
            $(this).stop().hide() ;
        })
    }
};

