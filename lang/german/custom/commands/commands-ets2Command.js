 /**
 * commands_est2Command.js
 *
 * Custom script that will look up the rout or payout of the current job for ETS2!
 *
 * Current version 1.1.0
 *
 * Original author: Dakoda
 *
 * Contributors:
 * NeedyPlays
 *
 */

 //useage commands
$.lang.register('est2.useage', '$1, Verwendung: !ets2 [Option]. Optionen: route, payout, set.');
$.lang.register('est2.set.useage', '$1, Verwendung: !ets2 set [Option]. Optionen: server, address, currency.');
$.lang.register('est2.set.server.useage', '$1, Verwendung: !ets2 set server [Server].');
$.lang.register('est2.set.currency.useage', '$1, Verwendung: !ets2 set currency [Währung].');
$.lang.register('est2.set.address.useage', '$1, Verwendung: !ets2 set address [IP-Adresse].');

//the connection and online checks
$.lang.register('est2.connections.404', '$1, $2 ist nicht mit ETS2 verbunden.');
$.lang.register('est2.online.404', '$1, $2 hat momentan keinen Job.');
$.lang.register('est2.server.404', '$1, auf $2 läuft offenbar kein Server.');
$.lang.register('est2.route.404', '$1, $2 scheint aktuell keinen Job zu haben.');

//the optional commands
$.lang.register('est2.route', '$1, $2 fährt momentan: Von: $3, Nach: $4. Auf Server $5.');
$.lang.register('est2.payout', '$1, $2 wird $3$4 beim aktuellen Job verdienen.');

//the set command
//this is to set the server
$.lang.register('est2.set.server', '$1, Hat den Server gesetzt auf: $2.');

//this is to set the currency
$.lang.register('est2.set.currency', '$1, Hat die Währung gesetzt auf: $2.');

//this is to set the address
$.lang.register('est2.set.address', '$1, Hat die IP-Adresse gesetzt auf: $2.');