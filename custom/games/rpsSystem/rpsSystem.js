/**
 * rpsSystem.js
 *
 * A Game that will let you play rock, paper, scissors against the bot!.
 */
(function () {
    function in_array(needle, haystack) {
        for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] == needle) return i;
        }
        return -1;
    }

    function runGame(sender, userOption, botOption) {
        var cost = $.getSetIniDbNumber('pricecom', 'rps', 10),
            amount = cost * 2,
            winnings = $.getPointsString(amount),
            losings = $.getPointsString(cost);

        if (userOption == 'rock') {
            switch (botOption) {
                case 'rock':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.rock1', $.botName));
                    break;
                case 'paper':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.rock2', $.botName, losings));
                    $.inidb.decr('points', sender.toLowerCase(), cost);
                    break;
                case 'scissors':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.rock3', $.botName, winnings));
                    $.inidb.incr('points', sender.toLowerCase(), amount);
                    break;
            }
        }

        if (userOption == 'paper') {
            switch (botOption) {
                case 'paper':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.paper1', $.botName));
                    break;
                case 'scissors':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.paper2', $.botName, losings));
                    $.inidb.decr('points', sender.toLowerCase(), cost);
                    break;
                case 'rock':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.paper3', $.botName, winnings));
                    $.inidb.incr('points', sender.toLowerCase(), amount);
                    break;
            }
        }

        if (userOption == 'scissors') {
            switch (botOption) {
                case 'scissors':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.scissors1', $.botName));
                    break;
                case 'rock':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.scissors2', $.botName, losings));
                    $.inidb.decr('points', sender.toLowerCase(), cost);
                    break;
                case 'paper':
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.scissors3', $.botName, winnings));
                    $.inidb.incr('points', sender.toLowerCase(), amount);
                    break;
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
            action = args[0];

        //Todo List
        if (command.equalsIgnoreCase('rps')) {
            if (!action) {
                $.say($.whisperPrefix(sender) + $.lang.get('rps.notype', $.pointNameMultiple, 'rock', 'paper', 'scissors'));
            } else {
                var rpsval = ['rock', 'paper', 'scissors'];
                if (in_array(action.toLowerCase(), rpsval) != -1) {
                    var singleRPS = rpsval[Math.floor(Math.random() * rpsval.length)];
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.pass', action, $.botName));
                    setTimeout(function () {
                        runGame(sender, action.toLowerCase(), singleRPS.toLowerCase());
                    }, 5e3);
                } else {
                    $.say($.whisperPrefix(sender) + $.lang.get('rps.nochoise'));
                }
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/games/rpsSystem.js')) {
            $.registerChatCommand('./custom/games/rpsSystem.js', 'rps', 7);
        }
    });
})();