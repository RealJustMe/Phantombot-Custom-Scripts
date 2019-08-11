/**
 * fortuneCommand.js
 *
 * Viewers can see there daily fortune
 */
(function () {
    var selfMessageCount = 0,
        lastRandom = -1,
        rand;

    /**
     * @function loadResponses
     */
    function loadResponses() {
        var i;
        for (i = 1; $.lang.exists('fortunecommand.' + i); i++) {
            selfMessageCount++;
        }
        $.consoleDebug($.lang.get('fortunecommand.console.loaded', selfMessageCount));
    }

    function fortune(sender) {
        do {
            rand = $.randRange(1, selfMessageCount);
        } while (rand == lastRandom);
        $.say($.lang.get('fortunecommand.' + rand, $.username.resolve(sender)));
        lastRandom = rand;
    }

    /**
     * @event command
     */
    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand();

        /**
         * @commandpath fortune - check your daily fortune.
         */
        if (command.equalsIgnoreCase('fortune')) {
            fortune(sender);
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/commands/fortuneCommand.js')) {
            if (selfMessageCount == 0) {
                loadResponses();
            }
            $.registerChatCommand('./custom/commands/fortuneCommand.js', 'fortune', 7);
        }
    });
})();
