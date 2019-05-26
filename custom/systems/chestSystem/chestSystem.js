/**
 * chestSystem.js
 *
 * open different random chests for different rewards
 *
 * Current version 1.1.0
 *
 * Original author: Dakoda
 *
 * Contributors:
 * x4nd3r_08
 *
 */
(function () {
    var // General variables
        chestCommands = [],
        liveToggle = $.getSetIniDbBoolean('chestSettings', 'liveToggle', true);

	/**
     * @function reloadChest
     */
    function reloadChest() {
        liveToggle = $.getIniDbBoolean('chestSettings', 'liveToggle');
    }

    /**
     * @function runChestPayout
     */
    function runChestPayout(sender, chest) {
        if ($.isOnline($.channelName) || !liveToggle) {
            var payout = $.inidb.get('chestType', chest.toLowerCase());
            payout = payout.split("-");

            var randomNumber = $.randRange(parseInt(payout[0]), parseInt(payout[1]));
            $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.chest.payout', $.getPointsString(randomNumber), chest));
            $.inidb.incr('points', sender, randomNumber);
        }
    }

    /**
     * @function loadChestCommands
     */
    function loadChestCommands() {
        var chestType = $.inidb.GetKeyList('chestType', '');
        for (var i = 0; i < chestType.length; i++) {
            if (!$.commandExists(chestType[i] + 'chest')) {
                $.registerChatCommand('./custom/systems/chestSystem.js', chestType[i] + 'chest', 7);
            }
        }
    }

	/**
     * @event command
	 */
    $.bind('command', function (event) {
        var command = event.getCommand(),
            sender = event.getSender(),
            args = event.getArgs(),
            action = args[0],
            optionChoice = args[1],
            optionValue = args[2],
            optionValue2 = args[3];

        var chestType = $.inidb.GetKeyList('chestType', '');
        var chestNames = [];
        for (var i = 0; i < chestType.length; i++) {
            chestNames.push(chestType[i] + ' (' + $.inidb.get('chestType', chestType[i]) + ')');
        }


        if (command.equalsIgnoreCase('chest')) {
            if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.chest.usage'));
                return;
            }
            /**
             * @commandpath "chest" toggle - Command for controlling the chest live toggle
             */
            if (action.equalsIgnoreCase('toggle')) {
                liveToggle = !liveToggle;
                $.setIniDbBoolean('chestSettings', 'liveToggle', liveToggle);
                reloadChest();
                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.toggle.announce', liveToggle ? 'enabled' : 'disabled'));
                return;
            }

            /**
             * @commandpath "chest" edit - Command for controlling the chest settings
             */
            if (action.equalsIgnoreCase('edit')) {
                if (optionChoice === undefined) {
                    $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.usage'));
                    return;
                }

				/**
				 * @commandpath "chest" edit [chest] [min]-[max] - Used to edit the amount of currency won for the chest. Set to 0 to disable.
				 */
                if (optionChoice !== undefined) {
                    if ($.bot.isModuleEnabled('./systems/pointSystem.js')) {
                        isReplace = $.inidb.exists('chestType', optionChoice.toLowerCase());
                        if ((optionValue === undefined) || isNaN(optionValue) || (optionValue < 0) || isNaN(optionValue2) || (optionValue2 < 0)) {
                            if (isReplace) {
                                var payment = $.inidb.get('chestType', optionChoice.toLowerCase());
                                payment = payment.split("-");
                                if (optionValue == 'null' || optionValue == 'remove' || optionValue == 'delete') {
                                    $.inidb.del('chestType', optionChoice.toLowerCase());
                                    $.unregisterChatCommand(optionChoice.toLowerCase() + 'chest');
                                    $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.success-deleted', optionChoice));
                                } else {
                                    $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.usage.exists', optionChoice, payment[0], payment[1]));
                                }
                            } else {
                                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.usage'));
                            }
                            return;
                        } else {
                            if (isReplace) {
                                minPay = parseInt(optionValue);
                                maxPay = parseInt(optionValue2);
                                $.inidb.set('chestType', optionChoice.toLowerCase(), minPay + '-' + maxPay);
                                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.success-update', optionChoice, minPay, maxPay));
                            } else {
                                minPay = parseInt(optionValue);
                                maxPay = parseInt(optionValue2);
                                chestCommands[optionChoice.toLowerCase() + 'chest'] = optionChoice.toLowerCase() + 'chest';
                                $.registerChatCommand('./custom/systems/chestSystem.js', optionChoice.toLowerCase() + 'chest', 7);
                                $.inidb.set('chestType', optionChoice.toLowerCase(), minPay + '-' + maxPay);
                                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.success-new', optionChoice, minPay, maxPay));
                            }
                            return;
                        }
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.usage.pointsystem', './systems/pointSystem.js'));
                    }
                }
                $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.edit.usage'));
                return;
            }
            $.say($.whisperPrefix(sender) + $.lang.get('chestsystem.chest.usage'));
            return;
        }

        if (command.equalsIgnoreCase('chests')) {
            $.paginateArray(chestNames, 'chestsystem.chests', ', ', true, $.username.resolve(sender));
        }

        if ($.commandExists(command.toLowerCase())) {
            if ($.isOnline($.channelName) || !liveToggle) {
                if ($.inidb.exists('chestType', command.toLowerCase().replace('chest', ''))) {
                    runChestPayout(sender, command.toLowerCase().replace('chest', ''));
                }
            }
        }
    });

	/**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/systems/chestSystem.js')) {
            // Register commands
            $.registerChatCommand('./custom/systems/chestSystem.js', 'chest', 1);
            $.registerChatSubcommand('chest', 'edit', 1);

            $.registerChatCommand('./custom/systems/chestSystem.js', 'chests', 7);

            loadChestCommands();
			/**
			 * Warn the user if the points system is disabled and this is enabled.
			 */
            if (!$.bot.isModuleEnabled('./systems/pointSystem.js')) {
                $.log.warn("./systems/pointSystem.js is not enabled. Chest will be disabled.");
            }
        }
    });

    $.reloadChest = reloadChest;
})();