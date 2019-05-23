//redeem main command
$.lang.register('redeem.usage', 'Benutze "!redeem [#]" im Chat, wobei # die Nummer der Belohnung ist, die du einlösen möchtest. Sieh dir die Belohnungen an: $1');
$.lang.register('redeem.reward.accept', '$1, hat für $3 $2 eingelöst.');
$.lang.register('redeem.reward.decline', '$1, Entschuldigung, es gibt keine Belohnung mit der Nummer $2 zum einlösen.');
$.lang.register('redeem.reward.nocost', '$1, es sieht so aus als hättest du nicht genug $2 für $3.');

//redeem add/edit command
$.lang.register('redeem.edit.usage', '$1, Benutze "!redeem edit [#] [Kosten] [Belohnung]" im Chat, wobei # die Nummer der Belohnung ist, die du ändern möchtest.');
$.lang.register('redeem.edit.success-new', 'Neue Belohnung $1 für $2 hinzugefügt mit Namen: $3');
$.lang.register('redeem.edit.success-update', 'Belohnung $1 aktualisiert auf $2 für: $3');
$.lang.register('redeem.edit.success-deleted', 'Belohnung $1 gelöscht');

//redeem discord system
$.lang.register('reward.postto.usage', '$1, Benutze "!redeem channel [Kanal].');
$.lang.register('reward.postto.announce', '$1, Discord-Ankündigungen werden nach $2 gepostet.');
$.lang.register('reward.toggle.announce', '$1, Discord-Ankündigungen wurden gesetzt auf $3.');
$.lang.register('discord.reward.announce.embedtitle', 'Belohnung eingelöst!');