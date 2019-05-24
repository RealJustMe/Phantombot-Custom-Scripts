//Bank settings for the bank system
$.lang.register('bank.set.interval', '$1, das Zinsintervall wurde auf $2 Sekunden gesetzt.');
$.lang.register('bank.set.interest', '$1, die Zinsen wurden auf $2% festgelegt.');
$.lang.register('bank.set.currency', '$1, die Währung wurde geändert auf $2.');
$.lang.register('bank.set.payout', '$1, die Zinsen sind $2.');
$.lang.register('bank.set.rankpay', '$1, die Auszahlung ist $2.');
$.lang.register('bank.set.online', '$1, der Online-Check ist $2.');
$.lang.register('bank.reset.all', '$1, die Konten aller Benutzer wurden geleert.');

//Bank command to check how long you have left for your rank.
$.lang.register('bank.rank.pass', '$1, Dein Rang bei der Bank ist $2. Gültig bis: $3');
$.lang.register('bank.rank.fail', '$1, Du hast momentan keinen Rang bei der Bank.');

//Bank payout confirmation
$.lang.register('bank.interest.paid', 'Die Bank hat Zinsen ausgezahlt zu einem Satz von x$1!');

//Bank command for the bank system
$.lang.register('bank.sender.check', '$1, Du hast momentan $2.');

//Add command for the bank system
$.lang.register('bank.add.succeed', '$1, Du hast erfolgreich $2 zu $4\'s Bankkonto hinzugefügt. Das Konto zählt nun $3');
$.lang.register('bank.add.fail', '$1, Entschuldigung, aber $2 ist nicht in unserem System.');
$.lang.register('bank.add.missing', '$1, Verwendung: !bank add <Summe> <Benutzername>.');

//Check command for the bank system
$.lang.register('bank.check.succeed', '$1, $2 hat im Moment einen Kontostand von $3.');
$.lang.register('bank.check.fail', '$1, Entschuldigung aber $2 ist nicht in unserem System.');
$.lang.register('bank.check.missing', '$1, Verwendung: !bank check <Benutzername>');

//Invest command for the bank system
$.lang.register('bank.invest.succeed', '$1, Die Summe von $2 wurde erfolgreich investiert. Dein Kontostand ist nun $3 und du kannst $4 investieren.');
$.lang.register('bank.invest.fail', '$1, Entschuldigung, du kannst momentan nur $2 investieren.');
$.lang.register('bank.invest.usage', '$1, Verwendung: !invest <Summe>.');

//Withdraw command for the bank system
$.lang.register('bank.withdraw.succeed', '$1, Die Summe von $2 wurde erfolgreich abgehoben. Dein Kontostand ist nun $3 und du kannst $4 investieren.');
$.lang.register('bank.withdraw.fail', '$1, Entschuldigung, du kannst momentan nur $2 abheben.');
$.lang.register('bank.withdraw.usage', '$1, Verwendung: !withdraw <Summe>.');

//Upgrade command for the bank system
$.lang.register('bank.upgrade.usage', '$1, Verwendung: !upgrade cost <Rang> <Kosten>.');
$.lang.register('bank.upgrade.cost', '$1, Du hast die Kosten für Rang $2 auf $3 gesetzt.');
$.lang.register('bank.upgrade.user', '$1, Du bist zum Bankrang $2 aufgestiegen.');
$.lang.register('bank.upgrade.fail', '$1, Du hast nicht genug $2 für diesen Rang, du brauchst $3 aber hast nur $4.');

//Payout command for the upgrade system.
$.lang.register('bank.upgrade.payout.usage', '$1, Verwendung: !upgrade payout <online/offline> <Rang> <Summe>.');
$.lang.register('bank.upgrade.payout.online', '$1, $2 Online-Rang zahlt nun $3 aus.');
$.lang.register('bank.upgrade.payout.offline', '$1, $2 Offline-Rang zahlt nun $3 aus.');

//Downgrade a user after a set time
$.lang.register('bank.downgrade.user', 'Du hast den Bankrang $2 verloren, führe !upgrade aus zum wieder aufzusteigen.');