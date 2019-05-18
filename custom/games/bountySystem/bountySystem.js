/**
 * bountySystem.js
 *
 * Command handler for a cute little mini game.
 * Add new game that users can play bountyhunter hunter <3.
 */
(function () {
    var currency, require,
        amountSucceed = $.getSetIniDbNumber('bountyHunter', 'succeed', 250),
        amountFail = $.getSetIniDbNumber('bountyHunter', 'fail', 20),
        cooldown = $.getSetIniDbNumber('bountyHunter', 'cooldown', 120),
        bountyHunter = $.getSetIniDbString('bountyHunter', 'hunter', $.botName),
        bountyHealth = $.getSetIniDbNumber('bountyHunter', 'health', 250),
        lastHunter = $.getSetIniDbString('bountyHunter', 'lastHunter', null),
        lastHunterSucceed = $.getSetIniDbString('bountyHunter', 'lastHunterSucceed', null),
        lastHunterFail = $.getSetIniDbString('bountyHunter', 'lastHunterFail', null);

    function reloadBounty() {
        amountSucceed = $.getIniDbNumber('bountyHunter', 'succeed');
        amountFail = $.getIniDbNumber('bountyHunter', 'fail');
        cooldown = $.getIniDbNumber('bountyHunter', 'cooldown');
        bountyHunter = $.getIniDbString('bountyHunter', 'hunter');
        bountyHealth = $.getIniDbNumber('bountyHunter', 'health');
        lastHunter = $.getIniDbString('bountyHunter', 'lastHunter');
        lastHunterSucceed = $.getIniDbString('bountyHunter', 'lastHunterSucceed');
        lastHunterFail = $.getIniDbString('bountyHunter', 'lastHunterFail');
    }

    /**
     * @event command
     */
    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            random;

        var points_sender = $.inidb.get('points', sender);

        /**
         * @commandpath bountyhunt - knock down the a bounty.
         */
        if (command.equalsIgnoreCase('bountyhunt')) {
            if (!action) {
                if (bountyHunter == sender) {
                    $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.sender.current'));
                } else if (lastHunter == sender) {
                    $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.sender.last'));
                } else {
                    if (points_sender >= amountFail) {
                        random = $.randRange(1, 100);
                        if (random >= bountyHealth) {
                            currency = $.getPointsString(amountSucceed);
                            $.inidb.incr('points', sender.toLowerCase(), amountSucceed);

                            $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.succeed', bountyHunter, currency));

                            lastHunterSucceed = $.setIniDbString('bountyHunter', 'lastHunterSucceed', sender);
                            lastHunter = $.setIniDbString('bountyHunter', 'lastHunter', sender);
                            bountyHunter = $.setIniDbString('bountyHunter', 'hunter', sender);
                            bountyHealth = $.setIniDbNumber('bountyHunter', 'health', amountSucceed);
                            amountSucceed = $.setIniDbNumber('bountyHunter', 'succeed', amountSucceed + 25);

                            $.coolDown.set('bountyhunt', false, cooldown, false);

                            setTimeout(function () {
                                $.say($.lang.get('bountyhunter.reset', $.username.resolve(bountyHunter), bountyHealth));
                            }, cooldown * 1000);
                        } else {
                            currency = $.getPointsString(amountFail);

                            $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.fail', bountyHunter, random, bountyHealth, currency));

                            $.inidb.decr('bountyHunter', 'health', random);
                            $.inidb.incr('bountyHunter', 'cost', random);
                            $.inidb.decr('points', sender.toLowerCase(), amountFail);
                            lastHunterFail = $.setIniDbString('bountyHunter', 'lastHunterFail', sender);
                            lastHunter = $.setIniDbString('bountyHunter', 'lastHunter', sender);
                        }
                    } else {
                        currency = $.getPointsString(points_sender);
                        require = $.getPointsString(amountFail);

                        $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.nopoints', currency, require));
                    }
                }
                reloadBounty();
                return;
            }
        }

        if (command.equalsIgnoreCase('bountysucceed')) {
            if (!isNaN(action)) {
                $.setIniDbNumber('bountyHunter', 'succeed', action);
                $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.set.succeed', action));
                reloadBounty();
            }
        }

        if (command.equalsIgnoreCase('bountyfail')) {
            if (!isNaN(action)) {
                $.setIniDbNumber('bountyHunter', 'fail', action);
                $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.set.fail', action));
                reloadBounty();
            }
        }

        if (command.equalsIgnoreCase('bountycd')) {
            if (!isNaN(action)) {
                $.setIniDbNumber('bountyHunter', 'cooldown', action);
                $.say($.whisperPrefix(sender) + $.lang.get('bountyhunter.set.cooldown', action));
                reloadBounty();
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/games/bountySystem.js')) {
            $.registerChatCommand('./custom/games/bountySystem.js', 'bountyhunt', 7);

            $.registerChatCommand('./custom/games/bountySystem.js', 'bountysucceed', 2);
            $.registerChatCommand('./custom/games/bountySystem.js', 'bountyfail', 2);
            $.registerChatCommand('./custom/games/bountySystem.js', 'bountycd', 2);
        }
    });

    $.reloadBounty = reloadBounty;
})();