/**
 * spotifySystem.js
 *
 * This command will get the lastes song from Spotify.
 *
 * Current version 1.0.2
 *
 * Original author: Alixe
 *
 * Contributors:
 * UsernamesSuck
 */
(function () {
    var client_id = $.getSetIniDbString('spotifySettings', 'client_id', 'client_id'),
        client_secret = $.getSetIniDbString('spotifySettings', 'client_secret', 'client_secret'),
        redirect_url = $.getSetIniDbString('spotifySettings', 'redirect_url', 'redirect_url'),
        spotify_latest = $.getSetIniDbString('spotifySettings', 'latest', 'latest'),
        spotify_apikey = $.getSetIniDbString('spotifySettings', 'apikey', 'apikey'),
        spotify_refreshkey = $.getSetIniDbString('spotifySettings', 'refreshkey', 'refreshkey'),
        spotify_announce = $.getSetIniDbBoolean('spotifySettings', 'announce', true),
        overwrite_youtube = $.getSetIniDbBoolean('spotifySettings', 'writeYt', false),
        youtube_path = $.getSetIniDbString('ytSettings', 'baseFileOutputPath', './addons/youtubePlayer/');

    /**
     * @function reloadSpotify
     */
    function reloadSpotify() {
        client_id = $.getIniDbString('spotifySettings', 'client_id');
        client_secret = $.getIniDbString('spotifySettings', 'client_secret');
        redirect_url = $.getIniDbString('spotifySettings', 'redirect_url');
        spotify_apikey = $.getIniDbString('spotifySettings', 'apikey');
        spotify_refreshkey = $.getIniDbString('spotifySettings', 'refreshkey');
        spotify_latest = $.getIniDbString('spotifySettings', 'latest');
        spotify_announce = $.getIniDbBoolean('spotifySettings', 'announce');
        overwrite_youtube = $.getIniDbBoolean('spotifySettings', 'writeYt');
        youtube_path = $.getIniDbString('ytSettings', 'baseFileOutputPath');
    }

    /**
     * get the json data!
     */
    function getJSON(url) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest,
            HashMap = Packages.java.util.HashMap,
            hashMap = new HashMap();
        try {
            spotify_apikey = $.getIniDbString('spotifySettings', 'apikey');
            hashMap.put('Content-Type', 'application/json');
            hashMap.put('Authorization', 'Bearer ' + spotify_apikey);
            var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, "", hashMap);

            return responseData.content;
        }
        catch (error) {
            $.consoleDebug('HttpRequest Failed: ' + error);
        }
    }

    /**
     * @function refreshToken
     */
    function refreshToken() {
        var HttpRequest = Packages.com.gmt2001.HttpRequest,
            HashMap = Packages.java.util.HashMap,
            hashMap = new HashMap();

        var urlDATA = client_id + ':' + client_secret;
        var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64; } else if (isNaN(i)) { a = 64; } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a); } return t; }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r); } if (a != 64) { t = t + String.fromCharCode(i); } } t = Base64._utf8_decode(t); return t; }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128); } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128); } } return t; }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++; } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2; } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3; } } return t; } };

        hashMap.put('Content-Type', 'application/x-www-form-urlencoded');
        hashMap.put('Authorization', 'Basic ' + Base64.encode(urlDATA));

        rtURL = 'https://accounts.spotify.com/api/token?refresh_token=' + spotify_refreshkey + '&grant_type=refresh_token&redirect_uri=' + redirect_url;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.POST, rtURL, '', hashMap);

        try {
            var json = JSON.parse(responseData.content);
            if (json.access_token !== undefined) {
                $.setIniDbString('spotifySettings', 'apikey', json.access_token);
                $.consoleDebug('Running Spotify Access_Token Update... ' + json.access_token);
            }
        } catch (error) {
            $.consoleDebug('Spotify Failed to to refresh token: ' + error);
        }
    }

    /*
     * @function checkNextsong
     */
    function checkNextsong() {
        if ($.bot.isModuleEnabled('./custom/systems/spotifySystem.js')) {
            if (!spotify_announce && !overwrite_youtube) {
                return;
            }

            if (spotify_apikey == 'apikey') {
                $.say($.lang.get('spotify.error.404', spotify_username, spotify_apikey));
                return;
            }

            try {
                var responce = getJSON("https://api.spotify.com/v1/me/player/currently-playing?is_playing=true");
                var json = JSON.parse(responce);
                if (json.item !== undefined) {
                    if (json.item.name) {
                        var artist = json.item.artists[0].name,
                            song = json.item.name,
                            external_url = json.item.external_urls.spotify,
                            output = artist + " - " + song + " | " + external_url,
                            is_playing = json.is_playing;

                        if (spotify_latest != output && is_playing) {
                            $.consoleDebug("Running Spotify Update..."); //This is only here for bug fixing
                            spotify_latest = output;
                            if (spotify_announce) {// Announces song to chat
                                $.say($.lang.get('spotify.latest.song', output));
                            }
                            if (overwrite_youtube) {// Writes to the Youtube player's song file (For OBS and stuff).
                                $.writeToFile(output + ' ', youtube_path + 'currentsong.txt', false);
                            }
                            $.setIniDbString('spotifySettings', 'latest', output);
                        }
                    }
                    $.consoleDebug("Running Spotify Update... " + json.item.artists[0].name + ' - ' + json.item.name);
                } else {
                    refreshToken();
                    $.consoleDebug('Running Spotify Refresh Token...' + json.error.message);
                }
            }
            catch (error) {
                $.consoleDebug('Something went wrong with Spotify: ' + error);
            }
        }
    }

    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            action1 = args[1];

        if (command.equalsIgnoreCase('spotify')) {
            if (!action) {
                // Get JSON and parse stats
                try {
                    var responce = getJSON("https://api.spotify.com/v1/me/player/currently-playing?is_playing=true");
                    var json = JSON.parse(responce);
                    if (json.item !== undefined) {
                        if (json.item.name) {
                            var artist = json.item.artists[0].name,
                                song = json.item.name,
                                external_url = json.item.external_urls.spotify,
                                output = artist + " - " + song + " | " + external_url;

                            $.say($.lang.get('spotify.latest.song', output));
                        }
                    } else {
                        refreshToken();
                        $.consoleDebug('Running Spotify Refresh Token...' + json.error.message);
                    }
                }
                catch (error) {
                    $.consoleDebug('Something went wrong with Spotify: ' + error);
                }
            } else if (action.equalsIgnoreCase('apikey')) {
                if (!action1) {
                    $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.change.failed', 'apikey'));
                    return;
                }
                $.setIniDbBoolean('spotifySettings', 'apikey', action1);
                $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.changed', 'apikey', '[key hidden]'));
                reloadSpotify();
            } else if (action.equalsIgnoreCase('refreshkey')) {
                if (!action1) {
                    $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.change.failed', 'refreshkey'));
                    return;
                }
                $.setIniDbBoolean('spotifySettings', 'refreshkey', action1);
                $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.changed', 'refreshkey', '[key hidden]'));
                reloadSpotify();
            } else if (action.equalsIgnoreCase('announce')) {
                spotify_announce = !spotify_announce;
                $.setIniDbBoolean('spotifySettings', 'announce', spotify_announce);
                $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.changed', 'announce', spotify_announce ? 'enabled' : 'disabled'));
                reloadSpotify();
            } else if (action.equalsIgnoreCase('writeyt')) {
                overwrite_youtube = !overwrite_youtube;
                $.setIniDbBoolean('spotifySettings', 'writeYt', overwrite_youtube);
                $.say($.whisperPrefix(sender) + $.lang.get('spotify.setting.changed', 'write file', overwrite_youtube ? 'enabled' : 'disabled'));
                reloadSpotify();
            }
        }
    });

    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/systems/spotifySystem.js')) {
            $.registerChatCommand('./custom/systems/spotifySystem.js', 'spotify', 6);
            $.registerChatSubcommand('spotify', 'refreshkey', 1);
            $.registerChatSubcommand('spotify', 'announce', 1);
            $.registerChatSubcommand('spotify', 'writeyt', 1);
            $.registerChatSubcommand('spotify', 'apikey', 1);
        }
    });

    setTimeout(function () {
        setInterval(function () { checkNextsong(); }, 5e3, 'scripts::custom::systems::spotifySystem.js');
    }, 5e3);

    $.reloadSpotify = reloadSpotify;
})();