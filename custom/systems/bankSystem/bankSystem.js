/**
 * bankSystem.js
 *
 * A module that will let you bank your currency.
 */

(function () {
    var interval = $.getSetIniDbNumber('bankSettings', 'interval', 600),
        upgrade = $.getSetIniDbNumber('bankSettings', 'upgrade', 30),
        payout = $.getSetIniDbBoolean('bankSettings', 'payout', false),
        rankpay = $.getSetIniDbBoolean('bankSettings', 'rankpay', false),
        rankup_bronze = $.getSetIniDbNumber('bankSettings', 'rankup_bronze', 600),
        rankup_iron = $.getSetIniDbNumber('bankSettings', 'rankup_iron', 1200),
        rankup_silver = $.getSetIniDbNumber('bankSettings', 'rankup_silver', 2500),
        rankup_gold = $.getSetIniDbNumber('bankSettings', 'rankup_gold', 5000),
        rankup_diamond = $.getSetIniDbNumber('bankSettings', 'rankup_diamond', 10000),
        rankup_emerald = $.getSetIniDbNumber('bankSettings', 'rankup_emerald', 20000),
        online = $.getSetIniDbBoolean('bankSettings', 'online', false),
        currency = $.getSetIniDbString('bankSettings', 'currency', 'diamond'),
        points_target;

    /**
     * @function reloadBank
     */
    function reloadBank() {
        interval = $.getIniDbNumber('bankSettings', 'interval');
        upgrade = $.getIniDbNumber('bankSettings', 'upgrade');
        payout = $.getIniDbBoolean('bankSettings', 'payout');
        rankpay = $.getIniDbBoolean('bankSettings', 'rankpay');
        rankup_bronze = $.getIniDbNumber('bankSettings', 'rankup_bronze');
        rankup_iron = $.getIniDbNumber('bankSettings', 'rankup_iron');
        rankup_silver = $.getIniDbNumber('bankSettings', 'rankup_silver');
        rankup_gold = $.getIniDbNumber('bankSettings', 'rankup_gold');
        rankup_diamond = $.getIniDbNumber('bankSettings', 'rankup_diamond');
        rankup_emerald = $.getIniDbNumber('bankSettings', 'rankup_emerald');
        online = $.getIniDbBoolean('bankSettings', 'online');
        currency = $.getIniDbString('bankSettings', 'currency');
    }

    /**
     * @function newDate
     * @returns {int}
     */
    function newDate() {
        var calendar = java.util.Calendar.getInstance();
        calendar.add(java.util.Calendar.DATE, upgrade);
        return parseInt(calendar.getTimeInMillis());
    }

    /**
     * @function checkDaysLeft
     * @param {int} olddate
     * @returns {int}
     */
    function checkDaysLeft(olddate) {
        var calendar = java.util.Calendar.getInstance();
        return parseInt(olddate - calendar.getTimeInMillis());
    }

    /**
     * @function timeConversion
     * @param {int} millisec
     * @returns {datetime}
     */
    function timeConversion(milliseconds) {
        //Get days from milliseconds
        var days = milliseconds / (1000 * 60 * 60 * 24);
        var absoluteDays = Math.floor(days);
        var d = absoluteDays > 9 ? absoluteDays : '0' + absoluteDays;

        //Get hours from milliseconds
        var hours = (days - absoluteDays) * 24;
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
        if (d > 0) {
            return d + ':' + h + ':' + m + ':' + s;
        }
        if (h > 0) {
            return h + ':' + m + ':' + s;
        }
        return m + ':' + s;
    }

    /**
     * @function generateDefaultRankBank
     */
    function generateDefaultRankBank() {
        $.getSetIniDbString('rankbank', 'Bronze', '-1');
        $.getSetIniDbString('rankbankoffline', 'Bronze', '-1');
        $.getSetIniDbString('rankbank', 'Iron', '-1');
        $.getSetIniDbString('rankbankoffline', 'Iron', '-1');
        $.getSetIniDbString('rankbank', 'Silver', '-1');
        $.getSetIniDbString('rankbankoffline', 'Silver', '-1');
        $.getSetIniDbString('rankbank', 'Gold', '-1');
        $.getSetIniDbString('rankbankoffline', 'Gold', '-1');
        $.getSetIniDbString('rankbank', 'Diamond', '-1');
        $.getSetIniDbString('rankbankoffline', 'Diamond', '-1');
        $.getSetIniDbString('rankbank', 'Emerald', '-1');
        $.getSetIniDbString('rankbankoffline', 'Emerald', '-1');
    }


    /**
     * @function getRankBankPayout
     * @param {string} rankbank
     * @returns {string}
     */
    function getRankBankPayout(rankbank, online) {
        if (online) {
            if (!$.inidb.exists('rankbank', rankbank)) {
                return -1;
            }
            return $.inidb.get('rankbank', rankbank);
        } else {
            if (!$.inidb.exists('rankbankoffline', rankbank)) {
                return -1;
            }
            return $.inidb.get('rankbankoffline', rankbank);
        }
    }

    /**
     * @function getUserRankBank
     * @param {string} username
     * @returns {string}
     */
    function getUserRankBank(username) {
        if (!$.inidb.exists('bankRanks', username.toLowerCase())) {
            return 'Viewer';
        }
        return $.inidb.get('bankRanks', username.toLowerCase());
    }

    /**
     * @function setUserRankBankById
     * @param {string} username
     * @param {int} id
     */
    function updateUserRankBank(username) {
        var pointsString;
        if ($.inidb.get('bankRanks', username.toLowerCase()) == 'Diamond') {
            if (points >= rankup_emerald) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Emerald');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_emerald);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Emerald'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_emerald, pointsString));
            }
        }
        if ($.inidb.get('bankRanks', username.toLowerCase()) == 'Gold') {
            if (points >= rankup_diamond) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Diamond');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_diamond);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Diamond'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_diamond, pointsString));
            }
        }
        if ($.inidb.get('bankRanks', username.toLowerCase()) == 'Silver') {
            if (points >= rankup_gold) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Gold');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_gold);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Gold'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_gold, pointsString));
            }
        }
        if ($.inidb.get('bankRanks', username.toLowerCase()) == 'Iron') {
            if (points >= rankup_silver) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Silver');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_silver);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Silver'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_silver, pointsString));
            }
        }
        if ($.inidb.get('bankRanks', username.toLowerCase()) == 'Bronze') {
            if (points >= rankup_iron) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Iron');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_iron);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Iron'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_iron, pointsString));
            }
        }
        if (!$.inidb.exists('bankRanks', username.toLowerCase())) {
            if (points >= rankup_bronze) {
                $.inidb.set('bankRanks', username.toLowerCase(), 'Bronze');
                $.inidb.set('bankTimes', username.toLowerCase(), newDate());
                $.inidb.incr('points', username.toLowerCase(), rankup_bronze);
                $.say($.lang.get('bank.upgrade.user', $.username.resolve(username), 'Bronze'));
            } else {
                pointsString = $.getPointsString($.inidb.get('points', sender));
                $.say($.lang.get('bank.upgrade.fail', $.username.resolve(username), currency, rankup_bronze, pointsString));
            }
        }
    }

    /**
    * @function runInterestTimer
    */
    function runInterestTimer() {
        payout = $.inidb.get('bankSettings', 'payout');
        rankpay = $.inidb.get('bankSettings', 'rankpay');
        interval = $.inidb.get('bankSettings', 'interval');
        interval = getMilliSeconds(interval);
        setTimeout(function () {
            if (payout == 'true') {
                runInterestPayout();
            }
            if (rankpay == 'true') {
                runRankBankPayout();
            }
            runInterestTimer();
        }, interval);
    }

    /**
    * @function runDayUserCheck
    */
    function runDayUserCheck() {
        var bankTimes = $.inidb.GetKeyList('bankTimes', '');
        var rUsers = [];
        try {
            for (var i in bankTimes) {
                var checkMilliseconds = checkDaysLeft($.inidb.GetString('bankTimes', '', bankTimes[i]));
                rUsers.push(bankTimes[i] + '(' + timeConversion(checkMilliseconds) + ')');
                if (checkMilliseconds < 0) {
                    var bankRank = $.getIniDbString('bankRanks', bankTimes[i]);
                    $.inidb.del('bankTimes', bankTimes[i]);
                    $.say($.whisperPrefix(bankTimes[i]) + $.lang.get('bank.downgrade.user', bankRank));
                }
            }
            $.consoleDebug('Executed ' + upgrade + ' Day Check. Users: ' + (rUsers.length > 0 ? rUsers.join(', ') : 'none'));
            $.log.file('bankSystem', 'Executed ' + upgrade + ' Day Check. Users: ' + (rUsers.length > 0 ? rUsers.join(', ') : 'none'));
            setTimeout(function () {
                runDayUserCheck();
            }, 2e5);
        }
        catch (error) {
            $.consoleDebug('[Bank System Error] ' + error);
            $.log.file('bankSystem', '[Bank System Error] ' + error);
        }
    }

    /**
     * @function getBanksString
     * @param {int} banked
     * @returns {int}
     */
    function getBanksString(banked) {
        if (banked != undefined) {
            return banked + ' ' + currency;
        }
    }

    /**
     * @function getMilliSeconds
     * @param {int} num
     * @returns {int}
     */
    function getMilliSeconds(num) {
        return num * 1000;
    }

    /**
     * @function runInterestPayout
     */
    function runInterestPayout() {
        var interest = $.getSetIniDbFloat('bankSettings', 'interest', 1.5),
            bankAccout,
            uUsers = [],
            username,
            i;

        online = $.inidb.get('bankSettings', 'online');
        if (online == 'true') {
            if ($.isOnline($.channelName)) {
                $.inidb.setAutoCommit(false);
                for (i in $.users) {
                    username = $.users[i][0].toLowerCase();

                    bankAccout = parseInt($.inidb.get('bank', username));
                    if (bankAccout > 0) {
                        interest = parseInt($.inidb.get('bankSettings', 'interest'));
                        tax = parseInt((bankAccout * interest));

                        $.inidb.incr('bank', username, tax);
                        uUsers.push(username + '(' + bankAccout + ')');
                    }
                }
                $.inidb.setAutoCommit(true);
                $.consoleDebug('Executed ' + currency + ' Interest. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
                $.log.file('bankSystem', 'Executed ' + currency + ' Interest. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
                $.say($.lang.get('bank.interest.paid', interest));
            }
        } else {
            $.inidb.setAutoCommit(false);
            for (i in $.users) {
                username = $.users[i][0].toLowerCase();

                bankAccout = parseInt($.inidb.get('bank', username));
                if (bankAccout > 0) {
                    interest = parseInt($.inidb.get('bankSettings', 'interest'));
                    tax = parseInt((bankAccout * interest));

                    $.inidb.incr('bank', username, tax);
                    uUsers.push(username + '(' + bankAccout + ')');
                }
            }
            $.inidb.setAutoCommit(true);
            $.consoleDebug('Executed ' + currency + ' Interest. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
            $.log.file('bankSystem', 'Executed ' + currency + ' Interest. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
            $.say($.lang.get('bank.interest.paid', interest));
        }
    }

    /**
     * @function runRankBankPayout
     */
    function runRankBankPayout() {
        var bankAccout,
            uUsers = [],
            username,
            i;

        online = $.inidb.get('bankSettings', 'online');
        if (online == 'true') {
            if ($.isOnline($.channelName)) {
                $.inidb.setAutoCommit(false);
                for (i in $.users) {
                    username = $.users[i][0].toLowerCase();

                    bankAccout = getRankBankPayout(getUserRankBank(username), true);
                    if (bankAccout > 0) {
                        $.inidb.incr('bank', username, bankAccout);
                        uUsers.push(username + '(' + bankAccout + ')');
                    }
                }
                $.inidb.setAutoCommit(true);
                $.consoleDebug('Executed ' + currency + ' RankBank. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
                $.log.file('bankSystem', 'Executed ' + currency + ' RankBank. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
            }
        } else {
            $.inidb.setAutoCommit(false);
            for (i in $.users) {
                username = $.users[i][0].toLowerCase();

                bankAccout = getRankBankPayout(getUserRankBank(username), false);
                if (bankAccout > 0) {
                    $.inidb.incr('bank', username, bankAccout);
                    uUsers.push(username + '(' + bankAccout + ')');
                }
            }
            $.inidb.setAutoCommit(true);
            $.consoleDebug('Executed ' + currency + ' RankBank. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
            $.log.file('bankSystem', 'Executed ' + currency + ' RankBank. Users: ' + (uUsers.length > 0 ? uUsers.join(', ') : 'none'));
        }
    }

    /**
     * @event command
     */
    $.bind('command', function (event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            action1 = args[0],
            action2 = args[1],
            action3 = args[2],
            intAction1 = parseInt(args[0]),
            intAction2 = parseInt(args[1]),
            intAction3 = parseInt(args[2]);

        var bank_sender = $.getSetIniDbNumber('bank', sender, 0),
            points_sender = $.getSetIniDbNumber('points', sender, 0),
            ranked_sender = $.username.resolve(sender);


        var targetUser,
            amountAdded,
            amountBanked;


        //Todo List
        if (command.equalsIgnoreCase('bank')) {
            if (!action1) {
                $.say($.lang.get('bank.sender.check', ranked_sender, getBanksString(bank_sender)));
            } else {
                //Reset all users bank
                if (action1.equalsIgnoreCase('resetall')) {
                    $.inidb.RemoveFile('bank');
                    $.say($.lang.get('bank.reset.all', ranked_sender));
                }

                //Checks the current rank of user.
                if (action1.equalsIgnoreCase('rank')) {
                    if ($.inidb.exists('bankTimes', sender)) {
                        var cBankRanks = $.inidb.get('bankRanks', sender);
                        var cBankTimes = new Date(parseInt($.inidb.get('bankTimes', sender))).toLocaleString();
                        $.say($.lang.get('bank.rank.pass', ranked_sender, cBankRanks, cBankTimes));
                    } else {
                        $.say($.lang.get('bank.rank.fail', ranked_sender));
                    }
                }

                //Set currency for the bank!
                if (action1.equalsIgnoreCase('currency')) {
                    if (action2) {
                        $.setIniDbNumber('bankSettings', 'currency', action2);
                        reloadBank();
                        $.say($.lang.get('bank.set.currency', ranked_sender, action2));
                    }
                }

                //Add currency to a users bank!
                if (action1.equalsIgnoreCase('add')) {
                    if (!intAction2) {
                        $.say($.lang.get('bank.add.missing', ranked_sender));
                    } else {
                        if (!action3) {
                            $.say($.lang.get('bank.add.missing', ranked_sender));
                        } else {
                            action3 = $.user.sanitize(action3);
                            targetUser = $.username.resolve(action3);
                            points_target = $.inidb.get('points', action3);
                            if (points_target) {
                                $.inidb.incr('bank', action3, intAction2);
                                amountAdded = getBanksString(intAction2);
                                amountBanked = $.inidb.get('bank', action3);
                                $.say($.lang.get('bank.add.succeed', ranked_sender, amountAdded, getBanksString(amountBanked), targetUser));
                            } else {
                                $.say($.lang.get('bank.add.fail', ranked_sender, targetUser));
                            }
                        }
                    }
                }

                //Check a users bank account
                if (action1.equalsIgnoreCase('check')) {
                    if (!action2) {
                        $.say($.lang.get('bank.check.missing', ranked_sender));
                    } else {
                        action2 = $.user.sanitize(action2);
                        targetUser = $.username.resolve(action2);
                        amountBanked = $.inidb.get('bank', action2);
                        if (amountBanked) {
                            $.say($.lang.get('bank.check.succeed', ranked_sender, targetUser, getBanksString(amountBanked)));
                        } else {
                            $.say($.lang.get('bank.check.fail', ranked_sender, targetUser));
                        }
                    }
                }

                //Set interval for Interest in bank!
                if (action1.equalsIgnoreCase('interval')) {
                    if (!isNaN(action2)) {
                        $.setIniDbNumber('bankSettings', 'interval', action2);
                        reloadBank();
                        $.say($.lang.get('bank.set.interval', ranked_sender, action2));
                    }
                }

                //Set interest for Interest in bank!
                if (action1.equalsIgnoreCase('interest')) {
                    if (!isNaN(action2)) {
                        $.setIniDbNumber('bankSettings', 'interest', action2);
                        reloadBank();
                        $.say($.lang.get('bank.set.interest', ranked_sender, action2));
                    }
                }

                //Activate payout for Interest in bank!
                if (action1.equalsIgnoreCase('payout')) {
                    payout = !payout;
                    $.setIniDbBoolean('bankSettings', 'payout', payout);
                    reloadBank();
                    $.say($.lang.get('bank.set.payout', ranked_sender, payout ? 'enabled' : 'disabled'));
                }

                //Activate rankpay for Interest in bank!
                if (action1.equalsIgnoreCase('rankpay')) {
                    rankpay = !rankpay;
                    $.setIniDbBoolean('bankSettings', 'rankpay', rankpay);
                    reloadBank();
                    $.say($.lang.get('bank.set.rankpay', ranked_sender, rankpay ? 'enabled' : 'disabled'));
                }

                //Activate online for Interest in bank!
                if (action1.equalsIgnoreCase('online')) {
                    online = !payout;
                    $.setIniDbBoolean('bankSettings', 'online', online);
                    reloadBank();
                    $.say($.lang.get('bank.set.online', ranked_sender, online ? 'enabled' : 'disabled'));
                }
            }

        }

        if (command.equalsIgnoreCase('invest')) {
            if (!intAction1) {
                $.say($.lang.get('bank.invest.usage', ranked_sender, amountBanked));
            } else {
                points_sender = $.inidb.get('points', sender);

                if (points_sender >= intAction1) {
                    $.inidb.decr('points', sender, intAction1);
                    $.inidb.incr('bank', sender, intAction1);
                    amountInvested = $.getPointsString(intAction1);
                    amountBanked = $.inidb.get('bank', sender);
                    points_sender = $.getPointsString($.inidb.get('points', sender));
                    $.say($.lang.get('bank.invest.succeed', ranked_sender, amountInvested, getBanksString(amountBanked), points_sender));
                } else {
                    points_sender = $.getPointsString($.inidb.get('points', sender));
                    $.say($.lang.get('bank.invest.fail', ranked_sender, points_sender));
                }
            }
        }

        if (command.equalsIgnoreCase('withdraw')) {
            if (!action1) {
                $.say($.lang.get('bank.withdraw.usage', ranked_sender, amountBanked));
            } else {
                amountBanked = $.inidb.get('bank', sender);

                if (amountBanked >= intAction1) {
                    $.inidb.incr('points', sender, intAction1);
                    $.inidb.decr('bank', sender, intAction1);
                    amountInvested = $.getPointsString(intAction1);
                    amountBanked = $.inidb.get('bank', sender);
                    points_sender = $.getPointsString($.inidb.get('points', sender));
                    $.say($.lang.get('bank.withdraw.succeed', ranked_sender, amountInvested, getBanksString(amountBanked), points_sender));
                } else {
                    amountBanked = $.getPointsString($.inidb.get('bank', sender));
                    $.say($.lang.get('bank.withdraw.fail', ranked_sender, amountBanked));
                }
            }
        }

        if (command.equalsIgnoreCase('upgrade')) {
            if (!action1) {
                updateUserRankBank(sender);
            } else {
                //Set currency for the bank!
                if (action1.equalsIgnoreCase('cost')) {
                    if (action2 && intAction3) {
                        if ($.inidb.exists('bankSettings', 'rankup_' + action2)) {
                            $.setIniDbNumber('bankSettings', 'rankup_' + action2, intAction3);
                            reloadBank();
                            $.say($.lang.get('bank.upgrade.cost', ranked_sender, action2, intAction3));
                        } else {
                            $.say($.lang.get('bank.upgrade.usage', ranked_sender));
                        }
                    } else {
                        $.say($.lang.get('bank.upgrade.usage', ranked_sender));
                    }
                }
            }

        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/systems/bankSystem.js')) {
            $.registerChatCommand('./custom/systems/bankSystem.js', 'bank', 7);
            $.registerChatSubcommand('bank', 'rank', 7);
            $.registerChatSubcommand('bank', 'currency', 1);
            $.registerChatSubcommand('bank', 'resetall', 1);
            $.registerChatSubcommand('bank', 'add', 1);
            $.registerChatSubcommand('bank', 'check', 1);
            $.registerChatSubcommand('bank', 'interval', 1);
            $.registerChatSubcommand('bank', 'interest', 1);
            $.registerChatSubcommand('bank', 'payout', 1);
            $.registerChatSubcommand('bank', 'rankpay', 1);
            $.registerChatSubcommand('bank', 'online', 1);

            $.registerChatCommand('./custom/systems/bankSystem.js', 'invest', 7);
            $.registerChatCommand('./custom/systems/bankSystem.js', 'withdraw', 7);
            $.registerChatCommand('./custom/systems/bankSystem.js', 'upgrade', 7);
            $.registerChatSubcommand('upgrade', 'cost', 1);

            generateDefaultRankBank();
            runInterestTimer();
            runDayUserCheck();
        }
    });

    $.reloadBank = reloadBank;
})();
