/**
 * chestSystem.js
 *
 * Language file for chestSystem.js
 *
 * Current version 1.1.0
 *
 * Original author: Dakoda
 *
 * Contributors:
 * x4nd3r_08
 *
 */

$.lang.register('chestsystem.chest.usage', 'Usage: !chest [edit | toggle].');
$.lang.register('chestsystem.toggle.announce', 'Live Toggle has been $1.');
//chest edit command.
$.lang.register('chestsystem.edit.usage', 'Usage: !chest edit <chest> <MinNumber> <MaxNumber>.');
$.lang.register('chestsystem.edit.usage.exists', 'Usage: !chest edit <chest> <MinNumber> <MaxNumber>. $1 Current setting: Min: $2, Max: $3.');
$.lang.register('chestsystem.edit.usage.pointsystem', 'chests can\'t be edited, because module "$1" isn\'t enabled.');
$.lang.register('chestsystem.edit.success-new', 'Added new $1 chest for Min: $2, Max: $3.');
$.lang.register('chestsystem.edit.success-update', 'Updated $1 chest for Min: $2, Max: $3.');
$.lang.register('chestsystem.edit.success-deleted', 'Deleted $1 chest');

//chests command.
$.lang.register('chestsystem.chests', 'Check out the Chests: $1');
$.lang.register('chestsystem.chest.payout', 'You have successfully collected $1 from the $2 chest!');