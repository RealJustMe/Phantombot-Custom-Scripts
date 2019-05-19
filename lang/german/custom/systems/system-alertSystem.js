 /**
 * system-alertSystem.js
 *
 * A module that will send custom alerts to the notificationHandler.js
 *
 * Current version 1.0.0
 *
 * Original author: Alixe
 *
 * Contributors:
 * ArthurTheLastAncient
 *
 */
$.lang.register('alert.fail', '$1, Verwendung: !alert twitter/toggle.');

$.lang.register('alert.twitter.fail', '$1, Verwendung: !alert twitter [twitch] [twitter].');
$.lang.register('alert.twitter.pass', '$1, Twitter-Account @$2 wurde $3 zugewiesen.');

$.lang.register('alert.toggle.fail', '$1, Verwendung: !alert toggle [Typ].');
$.lang.register('alert.toggle.pass', '$1, Twitter-Account @$2 wurde auf $3 gesetzt.');

$.lang.register('alert.retweet.fail', '$1, Verwendung: !alert retweet [twitch].');
$.lang.register('alert.retweet.pass', '$1, Du hast an $2 getweeetet.');

$.lang.register('alert.toggle.setting.pass', '$1, $2 Alert wurde gesetzt auf $3.');
$.lang.register('alert.toggle.setting.fail', '$1, $2 ist nicht in der Liste der Alerts.');

$.lang.register('alert.twitch.post', 'Etwas passiert im Stream von @$1 und ihr verpasst es! Kommt zu uns auf https://twitch.tv/$1');
$.lang.register('alert.twitch.fail', 'Host beendet.');

$.lang.register('alert.twitter.post', 'Etwas passiert im Stream von @$1 mit $2 und ihr verpasst es! Kommt zu uns auf https://twitch.tv/$3?$4');