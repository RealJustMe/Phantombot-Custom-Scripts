//store main command
$.lang.register('store.usage', 'Type "~store [#]" in chat, where # corresponds to the store number you\'d like to store. Check out the Store: $1');
$.lang.register('store.accept', '$1, has baught $2 for $3.');
$.lang.register('store.decline', '$1, Sorry there is no item to store numbered $2.');
$.lang.register('store.baught', '$1, Sorry but it looks like you have already baught $2.');
$.lang.register('store.nocost', '$1, but looks like you dont have enough $2 for $3.');

//store add/edit command
$.lang.register('store.edit.usage', '$1, Type "~store edit [#] [cost] [stock] [item]" in chat, where # corresponds to the store number you\'d like to edit.');
$.lang.register('store.edit.success-new', 'Added new store $1 for $2 with stoke: $3 | name: $4');
$.lang.register('store.edit.success-update', 'Updated store $1 for $2 with stoke: $3 | name: $4');
$.lang.register('store.edit.success-deleted', 'Deleted store $1');

//store discord system
$.lang.register('store.postto.usage', '$1, Type "~store channel [channel].');
$.lang.register('store.postto.announce', '$1, Discord Announcement messages will now be posted to $2.');
$.lang.register('store.toggle.announce', '$1, Discord Announcement has been $2.');
$.lang.register('discord.store.announce.embedtitle', 'New Redemption!');