//store main command
$.lang.register('store.usage', 'Benutze "!store [#]" im Chat,  wobei # die Nummer der Ware ist, die du kaufen möchtest. Sieh dir die Waren an: $1');
$.lang.register('store.accept', '$1, hat $2 für $3 gekauft.');
$.lang.register('store.decline', '$1, Entschuldigung, es gibt keine Ware mit der Nummer $2.');
$.lang.register('store.baught', '$1, Entschuldigung, aber du hast $2 bereits gekauft.');
$.lang.register('store.nocost', '$1, es sieht so aus als hättest du nicht genug $2 für $3.');

//store add/edit command
$.lang.register('store.edit.usage', '$1, Benutze "!store edit [#] [Kosten] [Vorrat] [Ware]" im Chat, wobei # die Nummer der Ware ist, die du ändern möchtest.');
$.lang.register('store.edit.success-new', 'Neue Ware $1 im Geschäft hinzugefügt. Preis: $2 | Vorrat: $3 | Name: $4');
$.lang.register('store.edit.success-update', 'Ware $1 aktualisiert. Preis: $2 | Vorrat: $3 | Name: $4');
$.lang.register('store.edit.success-deleted', 'Ware $1 gelöscht.');

//store discord system
$.lang.register('store.postto.usage', '$1, Benutze "!store channel [Kanal].');
$.lang.register('store.postto.announce', '$1, Discord-Ankündigungen werden nach $2 gepostet.');
$.lang.register('store.toggle.announce', '$1, Discord-Ankündigungen wurden $2.');
$.lang.register('discord.store.announce.embedtitle', 'Ware gekauft!');