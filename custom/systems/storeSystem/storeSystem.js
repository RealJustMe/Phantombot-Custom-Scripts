/**
 * storeSystem.js
 *
 * Command handler for a store system!
 */
(function () {
    var channelName = $.getSetIniDbString('storeSettings', 'postTo', 'notifications'),
        store_announce = $.getSetIniDbBoolean('storeSettings', 'announce', false);

    /**
     * @function reloadstore
     */
    function reloadstore() {
        channelName = $.getIniDbString('storeSettings', 'postTo');
        store_announce = $.getIniDbBoolean('storeSettings', 'announce');
    }

    /**
     * @event command
     */
    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0];

        var ranked_sender = $.username.resolve(sender),
            points_sender = $.inidb.get('points', sender);

        var storeItems = $.inidb.GetKeyList('storeItem', '');
        var storeNames = [];
        for (var i = 0; i < storeItems.length; i++) {
            storeNames.push('#' + storeItems[i] + ': ' + $.inidb.get('storeItem', storeItems[i]) + ' (' + $.getPointsString($.inidb.get('storeCost', storeItems[i])) + ') [' + $.inidb.get('storeStock', storeItems[i]) + ']');
        }

        if (command.equalsIgnoreCase('store')) {
            if (!action) {
                $.paginateArray(storeNames, 'store.usage', ', ', true, sender);
                return;
            } else {
                if (action.equalsIgnoreCase('edit')) {
                    if (args.length < 3) {
                        $.say($.lang.get('store.edit.usage', ranked_sender, storeNames.join(', ')));
                        return;
                    }
                    if (isNaN(args[1])) {
                        $.say($.lang.get('store.edit.usage', ranked_sender, storeNames.join(', ')));
                        return;
                    }
                    if (isNaN(args[2])) {
                        $.say($.lang.get('store.edit.usage', ranked_sender, storeNames.join(', ')));
                        return;
                    }
                    if (isNaN(args[3])) {
                        $.say($.lang.get('store.edit.usage', ranked_sender, storeNames.join(', ')));
                        return;
                    }

                    var storeNumber = args[1],
                        storeCost = args[2],
                        storeStock = args[3],
                        storeItem = args.splice(4).join(' ');

                    isReplace = $.inidb.exists('storeItem', storeNumber);
                    if (isReplace) {
                        if (storeItem === 'null' || storeItem === 'remove' || storeItem === 'delete') {
                            $.inidb.del('storeCost', storeNumber);
                            $.inidb.del('storeStock', storeNumber);
                            $.inidb.del('storeItem', storeNumber);
                            $.inidb.RemoveFile('storeID_' + storeNumber);
                            $.say($.whisperPrefix(sender) + $.lang.get('store.edit.success-deleted', storeNumber));
                        } else {
                            $.setIniDbNumber('storeCost', storeNumber, storeCost);
                            $.setIniDbNumber('storeStock', storeNumber, storeStock);
                            $.setIniDbString('storeItem', storeNumber, storeItem);
                            $.say($.whisperPrefix(sender) + $.lang.get('store.edit.success-update', storeNumber, $.getPointsString(storeCost), storeStock, storeItem));
                        }
                    } else {
                        $.setIniDbNumber('storeCost', storeNumber, storeCost);
                        $.setIniDbNumber('storeStock', storeNumber, storeStock);
                        $.setIniDbString('storeItem', storeNumber, storeItem);
                        $.inidb.AddFile('storeID_' + storeNumber);
                        $.say($.whisperPrefix(sender) + $.lang.get('store.edit.success-new', storeNumber, $.getPointsString(storeCost), storeStock, storeItem));
                    }
                    return;
                } else if (action.equalsIgnoreCase('toggle')) {
                    store_announce = !store_announce;
                    $.setIniDbBoolean('storeSettings', 'announce', store_announce);
                    reloadstore();
                    $.say($.lang.get('store.toggle.announce', ranked_sender, store_announce ? 'enabled' : 'disabled'));
                } else if (action.equalsIgnoreCase('channel')) {
                    if (args[1] !== undefined) {
                        $.setIniDbBoolean('storeSettings', 'postTo', args[1]);
                        reloadstore();
                        $.say($.lang.get('store.postto.announce', ranked_sender, args[1]));
                    } else {
                        $.say($.lang.get('store.postto.usage', ranked_sender));
                    }
                } else {
                    var storeNumber = args[0],
                        storeItemDb = $.getIniDbString('storeItem', storeNumber),
                        storeCostDb = $.getIniDbNumber('storeCost', storeNumber);

                    if (points_sender >= storeCostDb) {
                        if (storeItemDb) {
                            if ($.inidb.exists('storeID_' + storeNumber, sender)) {
                                $.say($.lang.get('store.baught', ranked_sender, storeItemDb));
                                return;
                            }
                            $.say($.lang.get('store.accept', ranked_sender, storeItemDb, $.getPointsString(storeCostDb)));
                            $.panelsocketserver.alertImage('store' + storeNumber + '.gif');
                            $.log.file('stores-system', ranked_sender + ' Baught ' + rewardItemDb);
                            if (store_announce) {
                                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                                    .withColor(244, 108, 108)
                                    .withThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png')
                                    .withTitle($.lang.get('discord.store.announce.embedtitle'))
                                    .appendDescription(ranked_sender + ' Baught ' + storeItemDb)
                                    .withTimestamp(Date.now())
                                    .withFooterText('Twitch')
                                    .withFooterIcon($.twitchcache.getLogoLink()).build());
                            }
                            $.inidb.decr('points', sender, storeCostDb);
                            $.inidb.decr('storeStock', storeNumber, 1);
                            storeStockDb = $.getIniDbNumber('storeStock', storeNumber);
                            if (storeStockDb <= 0) {
                                $.inidb.del('storeCost', storeNumber);
                                $.inidb.del('storeStock', storeNumber);
                                $.inidb.del('storeItem', storeNumber);
                                $.inidb.RemoveFile('storeID_' + storeNumber);
                            } else {
                                $.setIniDbString('storeID_' + storeNumber, sender, true);
                            }
                        } else {
                            $.say($.lang.get('store.decline', ranked_sender, storeNumber));
                        }
                    } else {
                        if (storeItemDb) {
                            $.say($.lang.get('store.nocost', ranked_sender, $.pointNameMultiple, storeItemDb));
                        } else {
                            $.say($.lang.get('store.decline', ranked_sender, storeNumber));
                        }
                    }
                    return;
                }
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/systems/storeSystem.js')) {
            $.registerChatCommand('./custom/systems/storeSystem.js', 'store', 7);
            $.registerChatSubcommand('store', 'toggle', 1);
            $.registerChatSubcommand('store', 'edit', 1);
        }
    });
})();