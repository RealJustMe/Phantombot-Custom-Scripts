/**
 * rulesCommand.js
 *
 * This command is to set my rules in discord.
 */
(function () {
    var ReactionEmoji = Packages.sx.blah.discord.handle.impl.obj.ReactionEmoji;
    var channelName = $.getSetIniDbString('rulesSettings', 'onlineChannel', 'welcome'),
        channelMessage = $.getSetIniDbString('rulesSettings', 'channelMessage', null);

    $.bind('discordChannelCommand', function (event) {
        var command = event.getCommand(),
            message = event.getDiscordMessage();

        if (command.equalsIgnoreCase('rules')) {
            message['delete']();

            $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                .withColor(170, 91, 190)
                .withThumbnail('https://dakoda.ga/bot/images/welcome.png')
                .withTitle(':desktop: Welcome to the server!')
                .appendField('Thank you all for coming and joining the community.', 'It is greatly appreciated and I love each and everyone of you! \n\rWe as a community pride ourselves on interaction and bringing a positive light to everyone here. \n\rKick off your shoes, sit back and enjoy. \n\rEnjoy your time here and please get in touch with any <@&365977083593097216> or <@&365977085153640461> if you are having a problem.', true)
                .build());

            setTimeout(function () {
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(164, 65, 65)
                    .withThumbnail('https://dakoda.ga/bot/images/disclaimer.png')
                    .withTitle(':clap: Our Disclaimer')
                    .appendField('Read the following before you start traveling this Discord server:', 'Change your profile picture, because adds a more personal feel to your profile. \n\rChange your settings that you deemed necessary - especially applying a PTT button for the voice servers. \n\r You should be given the <@&365977088160694277> role within 72 hours of joining the server and linking your twitch to the bot, but if you haven\'t then please send a DM to myself or any of the other <@&365977083593097216> or <@&365977085153640461> in the server.', true)
                    .build());
            }, 500);

            setTimeout(function () {
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(67, 164, 65)
                    .withThumbnail('https://dakoda.ga/bot/images/roles.png')
                    .withTitle(':blue_book: Our Server Roles')
                    .appendField('The following are a list of roles that we use on the server:', '<@&365977083379187723> - "Community Owner" \n<@&365977083593097216> - "Community Admin" \n<@&365977085153640461> - "People of power on Twitch" \n<@&365977085820403712> - "Community Subscribers" \n<@&365977086772379668> - "Community Donators" \n<@&520747089802690590> - "Community VIP" \n<@&365977087783206914> - "Community Regular" \n<@&365977088160694277> - "Community Viewer" \n <@&418194594363080715> - "Live Streamers" \n<@&183554994908168192> - "Special Streamers" \n<@&366533443485433869> - "Community Bot"', true)
                    .build());
            }, 1000);

            setTimeout(function () {
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(65, 95, 164)
                    .withThumbnail('https://dakoda.ga/bot/images/chat.png')
                    .withTitle(':speech_left: Our Chats')
                    .appendField('The following are a list of chats that we use here on the server:', '<#183552954752696320> - "Infomation about the server is!" \n<#151204639759400961> - "I will post any updates about myself and my channel!" \n<#119180192559267844> - "Most users will chat with eachother here!" \n<#183551693160579072> - "Bot commands can be ran here! (to keep other chats clear of spam)" \n<#409754025433759768> - "Welcome new member messages!" \n<#409754184137703425> - "Bot will post updates about my twitch stream here!" \n<#409752860146794506> - "Where <@&183554994908168192> can post going live events!" \n<#506116705844723727> - "Where <@410097697446428672> post promotions!" \n<#346808660724416515> - "Auto posts clips that are posted in my twitch chat!" \n<#409753664790593553> - "Twitter updates and retweets!"  \n<#409746586164527114> - "Well that says it all I guess!" \n<#333624330275651584> - "Moderation logs will be going in here for staff"', true)
                    .build());
            }, 1500);

            setTimeout(function () {
                var readRules = $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(164, 156, 65)
                    .withThumbnail('https://dakoda.ga/bot/images/rules.png')
                    .withTitle(':white_check_mark: Our Server Rules')
                    .appendField('Adhere to the following rules in order to achieve the best possible experience:', '1. Do not use language that is deemed racist, sexist, homophobic or derogatory. \n2. Attempt to be helpful and respectful to your fellow members. \n3. I welcome and respect all of your opinions, so I expect the same in return and to your fellow members. \n4. Do not post spoilers for anything in the public channels, keep these to private messages if the user requested them. \n5. Do not advertise anything unless it has been pre-approved. If you are a <@&183554994908168192>  you can post when you go live in the <#409752860146794506>  channel. \n6. Do not spam this server or use unnecessary caps. \n7. Keep everything to the English language.\n\n**If you accept these rules, react with the <:AcceptRules:581627908335075328> emoji on this post. Doing so will grant you access to the Discord! **', true)
                    .build());
                $.setIniDbString('rulesSettings', 'channelMessage', readRules.getStringID());

                var xEmoji = ReactionEmoji.of(':AcceptRules:581627908335075328');
                $.discordAPI.addReaction(readRules, xEmoji);
            }, 2000);

            setTimeout(function () {
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(65, 123, 164)
                    .withThumbnail('https://dakoda.ga/bot/images/twitch.png')
                    .withTitle(':link: How to Link To Twitch')
                    .appendField('Please link your account to twitch.. Just Follow these steps here:', 'Step 1. Link your Discord: Type `!account link` into <#183551693160579072>! \n\rStep 2. Follow the message the bot will private message you.', true)
                    .build());
            }, 2500);

            setTimeout(function () {
                $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(100, 65, 164)
                    .withThumbnail('https://dakoda.ga/bot/images/twitter.png')
                    .withTitle(':link: How to Link To Twitter')
                    .appendField('Please link your twitter account to twitch.. Just Follow these steps here:', 'Link: `!twitter register [username]` - Register your Twitter for rewards \n\rUnlink: !twitter unregister - Unregister your Twitter', true)
                    .build());
            }, 3000);
        }

    });

    /**
     * @event discordMessageReaction
     */
    $.bind('discordMessageReaction', function (event) {
        var reactionEvent = event.getEvent(),
            reactionUser = reactionEvent.getUser(),
            reactionType = event.getType(),
            reaction = reactionEvent.getReaction(),
            messageID = reaction.getMessage().getStringID(),
            messageEmoji = reaction.getEmoji();

        channelMessage = $.getSetIniDbString('rulesSettings', 'channelMessage');
        $.consoleDebug('reactionUser: ' + reactionUser.getStringID() + ' reactionType: ' + reactionType + ' channelMessage: ' + channelMessage + ' messageID: ' + messageID + ' messageEmoji: ' + messageEmoji.getStringID());
        if (channelMessage == messageID) {
            if (messageEmoji.getStringID() == 581627908335075328) {
                switch (String(reactionType).toLowerCase()) {
                    case 'add':
                        $.discordAPI.addRole('Rules', reactionUser);
                        $.consoleDebug('addded Rules ' + reactionUser);
                        break;
                    case 'remove':
                        $.discordAPI.removeRole('Rules', reactionUser);
                        $.consoleDebug('removed Rules ' + reactionUser);
                        break;
                    default:
                        $.discordAPI.removeRole('Rules', reactionUser);
                        $.consoleDebug('removed Rules ' + reactionUser);

                }
            }
        }
    });

    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/commands/rulesCommand.js', 'rules', 1);
    });
})();