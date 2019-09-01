/**
 * dailySystem.js
 *
 * Language file for dailySystem.js
 *
 * Current version 1.1.0
 *
 * Original author: Dakoda
 *
 * Contributors:
 * ImChrisP
 *
 */

/**
 * Main daily strings
 */
$.lang.register('dailysystem.daily.usage', 'Verwendung: !$1 [ undefined | set ]');
$.lang.register('dailysystem.daily.offline', '!$1 kann nun benutzt werden wenn $2 live ist!');
$.lang.register('dailysystem.daily.payout', 'Du hast deine tägliche Belohnung von $1 eingesammelt! Du kannst es morgen noch einmal für eine größere Belohnung versuchen.');
$.lang.register('dailysystem.daily.cooldown', 'Du hast deine tägliche BElohnung heute bereits eingesammelt. Du kannst es morgen noch einmal für eine größere Belohnung versuchen.');

/**
 * daily set strings
 */
//main command for setting the varables.
$.lang.register('dailysystem.set.usage','Verwendung: !$1 set [ <Benutzergruppen-ID> | baseCommand ]');
$.lang.register('dailysystem.set.usage.pointsystem','Tägliche Belohnung kann nicht aktiviert werden, weil das Modul "$1" nicht aktiviert ist.');
//set daily .
$.lang.register('dailysystem.set.usage','Verwendung: !$1 set <Benutzergruppen-ID> <Minimum-Summe> <Maximum-Summe>. Aktuelle Einstellung: Min: $2, Max: $3.');
$.lang.register('dailysystem.set.success','$1 Die Auszahlung wurde neu eingestellt: Min: $2, Max: $3.');
$.lang.register('dailysystem.set.fail','$1 ist keine gültige Benutzergruppen-ID!');
//set Base Command.
$.lang.register('dailysystem.set.basecommand.usage','Verwendung: !$1 set baseCommand <Name>. Setzt den Kommandonamen. WARNUNG! Den Namen zu ändern setzt die Berechtigungen zurück!');
$.lang.register('dailysystem.set.basecommand.success','Kommandoname wurde eingestellt auf !$1.');
$.lang.register('dailysystem.set.basecommand.failed','Kommandoname kann nicht auf !$1 eingestellt werden, weil das Kommando bereits existiert!');