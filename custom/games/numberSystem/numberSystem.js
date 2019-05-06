/**
 * numberSystem.js
 *
 * Command handler for a lottery system!
 */
(function () {
    var gameActive = false,
        currentNumber = $.getSetIniDbNumber('numberSettings', 'currentNumber', 0),
        amountSucceed = $.getSetIniDbNumber('numberSettings', 'amountSucceed', 20),
        numberToggle = $.getSetIniDbBoolean('numberSettings', 'numberToggle', true),
        perviousNumber = $.getSetIniDbNumber('numberSettings', 'perviousNumber', 0),
        perviousWinner = $.getSetIniDbString('numberSettings', 'perviousWinner', null);

    function reloadNumber() {
        currentNumber = $.getIniDbNumber('numberSettings', 'currentNumber');
        amountSucceed = $.getIniDbNumber('numberSettings', 'amountSucceed');
        numberToggle = $.getIniDbBoolean('numberSettings', 'numberToggle');
        perviousNumber = $.getIniDbNumber('numberSettings', 'perviousNumber');
        perviousWinner = $.getIniDbString('numberSettings', 'perviousWinner');
    }

    /**
     * @function getRandomInt
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * @function messageListener
     * 
     * Hook for @event ircChannelMessage
     *
     * Parameters:
     * @object event
     */
    function messageListener(event) {
        var sender = event.getSender().toLowerCase();
        var message = event.getMessage();
        var ranked_sender = $.username.resolve(sender);

        if (gameActive) {
            if (!message.startsWith('!') && !$.isTwitchBot(sender)) {
                if (message == currentNumber) {
                    $.say($.lang.get('number.guessed.correct', ranked_sender, currentNumber));
                    $.inidb.incr('points', sender.toLowerCase(), amountSucceed);
                    $.inidb.incr('numberUsers', sender.toLowerCase(), 1);
                    perviousWinner = $.setIniDbString('numberSettings', 'perviousWinner', ranked_sender);
                    perviousNumber = $.setIniDbNumber('numberSettings', 'perviousNumber', currentNumber);
                    $.unbind('ircChannelMessage', messageListener);
                    gameActive = false;
                    reloadNumber();
                }
            }
        }
    }

    /**
      * @event command
      */
    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            intAction1 = parseInt(args[1]),
            intAction2 = parseInt(args[2]);

        var ranked_sender = $.username.resolve(sender);

        if (command.equalsIgnoreCase('number')) {
            if (!action) {
                if (numberToggle) {
                    if ($.inidb.exists('numberUsers', sender)) {
                        var totalNumbers = $.getIniDbNumber('numberUsers', sender);
                        $.say($.lang.get('number.user.total', ranked_sender, totalNumbers));
                    } else {
                        $.say($.lang.get('number.user.none', ranked_sender));
                    }
                }
                return;
            } else {
                if (action.equalsIgnoreCase('toggle')) {
                    numberToggle = !numberToggle;
                    $.inidb.set('numberSettings', 'numberToggle', numberToggle);
                    $.say($.lang.get('number.toggle.pass', ranked_sender, (numberToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    reloadNumber();
                }
                if (action.equalsIgnoreCase('show')) {
                    if (numberToggle) {
                        if (perviousNumber > 0) {
                            $.say($.lang.get('number.show.pass', ranked_sender, perviousNumber));
                        } else {
                            $.say($.lang.get('number.show.fail', ranked_sender));
                        }
                    } else {
                        $.say($.lang.get('number.disabled', ranked_sender));
                    }
                }
                if (action.equalsIgnoreCase('winner')) {
                    if (numberToggle) {
                        if (perviousWinner !== null && perviousNumber > 0) {
                            $.say($.lang.get('number.winner.pass', ranked_sender, perviousWinner, perviousNumber));
                        } else {
                            $.say($.lang.get('number.winner.fail', ranked_sender));
                        }
                    } else {
                        $.say($.lang.get('number.disabled', ranked_sender));
                    }
                }
                if (action.equalsIgnoreCase('generate')) {
                    if (numberToggle) {
                        if (intAction1 && intAction2) {
                            if (!gameActive) {
                                currentNumber = $.setIniDbNumber('numberSettings', 'currentNumber', getRandomInt(intAction1, intAction2));
                                $.bind('ircChannelMessage', messageListener);
                                gameActive = true;
                                reloadNumber();
                                $.say($.lang.get('number.generate.pass', ranked_sender, intAction1, intAction2));
                            } else {
                                $.say($.lang.get('number.generate.fail', ranked_sender));
                            }
                        } else {
                            $.say($.lang.get('number.generate.usage', ranked_sender));
                        }
                    } else {
                        $.say($.lang.get('number.disabled', ranked_sender));
                    }
                }
                return;
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/games/numberSystem.js')) {
            $.registerChatCommand('./custom/games/numberSystem.js', 'number', 7);
            $.registerChatSubcommand('number', 'toggle', 1);
            $.registerChatSubcommand('number', 'generate', 1);
            $.registerChatSubcommand('number', 'show', 7);
            $.registerChatSubcommand('number', 'winner', 7);
        }
    });
})();