//Bank settings for the bank system
$.lang.register('bank.set.interval', '$1, Interval for interest has been set to $2 seconds.');
$.lang.register('bank.set.interest', '$1, Interest system has been set to $2%.');
$.lang.register('bank.set.currency', '$1, currency has been set to $2.');
$.lang.register('bank.set.payout', '$1, Interest system has been $2.');
$.lang.register('bank.set.rankpay', '$1, Payout system has been $2.');
$.lang.register('bank.set.online', '$1, Online check has been $2.');
$.lang.register('bank.reset.all', '$1, All users banks were reset.');

//Bank command to check how long you have left for your rank.
$.lang.register('bank.rank.pass', '$1, You currently have $2 rank in the bank. Expire: $3');
$.lang.register('bank.rank.fail', '$1, You currently do not have a rank in the bank.');

//Bank payout confirmation
$.lang.register('bank.interest.paid', 'Banks interest has been paid out at x$1 interest!');

//Bank command for the bank system
$.lang.register('bank.sender.check', '$1, You currently have a total of $2.');

//Add command for the bank system
$.lang.register('bank.add.succeed', '$1, You have successfully added $2 to $4\'s bank account. They now have a total of $3');
$.lang.register('bank.add.fail', '$1, Sorry but $2 in not in out system.');
$.lang.register('bank.add.missing', '$1, Usage: !bank add <amount> <username>.');
$.lang.register('bank.add.fail', '$1, Sorry but $2 in not in out system.');

//Check command for the bank system
$.lang.register('bank.check.succeed', '$1, $2 currently has a total of $3.');
$.lang.register('bank.check.fail', '$1, Sorry but $2 in not in out system.');
$.lang.register('bank.check.missing', '$1, Usage: !bank check <username>');

//Invest command for the bank system
$.lang.register('bank.invest.succeed', '$1, The amount of $2 has been invested successfully. Your account balance is now $3 and you currently have a total of $4 you can invest.');
$.lang.register('bank.invest.fail', '$1, Sorry you only have $2 you can currently invest.');
$.lang.register('bank.invest.usage', '$1, Usage: !invest <amount>.');

//Withdraw command for the bank system
$.lang.register('bank.withdraw.succeed', '$1, The amount of $2 has been withdrawn successfully. Your account balance is now $3 and you currently have a total of $4 you can invest.');
$.lang.register('bank.withdraw.fail', '$1, Sorry you only have $2 you can currently withdraw.');
$.lang.register('bank.withdraw.usage', '$1, Usage: !withdraw <amount>.');

//Upgrade command for the bank system
$.lang.register('bank.upgrade.usage', '$1, Usage: !upgrade cost <rank> <cost>.');
$.lang.register('bank.upgrade.cost', '$1, You have set $2 rank to cost $3.');
$.lang.register('bank.upgrade.user', '$1, You have upgraded to $2 bank rank.');
$.lang.register('bank.upgrade.fail', '$1, You don\'t seem to have enough $2 for that rank, you need $3 but only seem to have $4.');

//Payout command for the upgrade system.
$.lang.register('bank.upgrade.payout.usage', '$1, Usage: !upgrade payout <online/offline> <rank> <amount>.');
$.lang.register('bank.upgrade.payout.online', '$1, You have set $2 online rank to payout $3.');
$.lang.register('bank.upgrade.payout.offline', '$1, You have set $2 offline rank to payout $3.');

//Downgrade a user after a set time
$.lang.register('bank.downgrade.user', 'You have lost $2 bank rank, you can do !upgrade to upgrade your rank again.');