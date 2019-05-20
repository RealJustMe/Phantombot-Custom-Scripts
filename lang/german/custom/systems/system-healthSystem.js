/**
 * systems-healthSystem.js
 *
 * Language file for healthSystem.js
 *
 * Current version 1.0.4
 * https://community.phantombot.tv/t/wellness-feature-then-some/3931
 *
 * Original author: Dakoda
 *
 * Contributors:
 * ShadowDragon7015, Khryztoepher, BantomPhot
 *
 *
 */

/**
 * Main health strings
 */
$.lang.register('healthsystem.health.usage', 'Verwendung: !$1 [ hydration | hunger | movement | sleep | wellbeing | toggle ]');
$.lang.register('healthsystem.health.offline', '!$1 $2 kann nur benutzt werden wenn $3 live ist!');

/**
 * Settings health strings
 */
// usage strings
$.lang.register('healthsystem.settings.usage', 'Verwendung: !$1 [ set | check ]');
$.lang.register('healthsystem.settings.usage.set', 'Verwendung: !$1 set [ hydration | hunger | movement | sleep | wellbeing ]');
$.lang.register('healthsystem.settings.usage.set.hydration', 'Verwendung: !$1 set hydration [ oz | timer ] <Zahl>');
$.lang.register('healthsystem.settings.usage.set.hunger', 'Verwendung: !$1 set hunger [ timer ] <Zahl>');
$.lang.register('healthsystem.settings.usage.set.movement', 'Verwendung: !$1 set movement [ timer ] <Zahl>');
$.lang.register('healthsystem.settings.usage.set.sleep', 'Verwendung: !$1 set sleep [ timer ] <Zahl>');
$.lang.register('healthsystem.settings.usage.set.wellbeing', 'Verwendung: !$1 set wellbeing [ timer ] <Zahl>');
// check strings
$.lang.register('healthsystem.settings.check.usage', 'Verwendung: !$1 check [ hydration | hunger | movement | sleep | wellbeing ]');
$.lang.register('healthsystem.settings.check.hydration', '$1 aktuelle Einstellungen: HydrationOZ: $2 HydrationTimer: $3 HydrationToggle: $4');
$.lang.register('healthsystem.settings.check.hunger', '$1 aktuelle Einstellungen: HungerTimer: $2 HungerToggle: $3');
$.lang.register('healthsystem.settings.check.movement', '$1 aktuelle Einstellungen: MovementTimer: $2 MovementToggle: $3');
$.lang.register('healthsystem.settings.check.sleep', '$1 aktuelle Einstellungen: SleepTimer: $2 SleepToggle: $3');
$.lang.register('healthsystem.settings.check.wellbeing', '$1 aktuelle Einstellungen: WellbeingTimer: $2 WellbeingToggle: $3');

/**
 * Hydration  strings
 */
$.lang.register('healthsystem.hydration.reminder', 'Du bist jetzt ein klein wenig mehr als $1 live. Zu diesem Zeitpunkt sollstest du mindestens $3mL ($2oz) Wasser/H2O zu dir genommen haben, um die optimale Wasserversorgung zu gewährleisten.');
$.lang.register('healthsystem.hydration.command', '$1 war jetzt ein klein wenig mehr als $2. Zu diesem Zeitpunkt sollstest du mindestens $4mL ($3oz) Wasser/H2O zu dir genommen haben, um die optimale Wasserversorgung zu gewährleisten.');

/**
 * Hunger  strings
 */
$.lang.register('healthsystem.hunger.reminder', 'Du bist jetzt ein klein wenig mehr als $1 live, dies ist eine Erinnerung daran, eine kleine Essenspause einzulegen.');
$.lang.register('healthsystem.hunger.command', '$1 war jetzt ein klein wenig mehr als $2 live, und sollte eine Essenspause in $3 Minuten einlegen.');

/**
 * Movement  strings
 */
$.lang.register('healthsystem.movement.reminder', 'Du bist jetzt ein klein wenig mehr als $1 live, dies ist eine Erinnerung daran, eine Pause zu machen um sich etwas zu bewegen/strecken.');
$.lang.register('healthsystem.movement.command', '$1 war jetzt ein klein wenig mehr als $2 live, und sollte in $3 Minuten eine Pause machen um sich etwas zu bewegen/strecken.');

/**
 * Sleep  strings
 */
$.lang.register('healthsystem.sleep.reminder', 'Du bist jetzt ein klein wenig mehr als $1 live, dies ist eine Erinnerung daran, dass du ein Nickerchen machen solltest.');
$.lang.register('healthsystem.sleep.command', '$1 war jetzt ein klein wenig mehr als $2 live, und sollte in den nächsten $3 Minuten ein Nickerchen einlegen.');

/**
 * Wellbeing  strings
 */
// reminder messages
$.lang.register('healthsystem.wellbeing.reminder.loaded', '$1 Wohlfühl-Einnerungen gefunden.');
$.lang.register('healthsystem.wellbeing.reminder.1', 'Ich möchte euch nur daran erinnern, wie sehr ich euch schätze und ALLES was ihr hier tut!');
$.lang.register('healthsystem.wellbeing.reminder.2', 'Jeder Tag hat 1440 Minuten. Das heißt WIR haben täglich 1440 Chancen einen positiven Einfluss zu haben.');
$.lang.register('healthsystem.wellbeing.reminder.3', 'Wenn ich euch umarmen könnte, würde ich. Kann das mal IRGENDJEMAND machen!');
$.lang.register('healthsystem.wellbeing.reminder.4', 'Denkt daran, ihr seid NUR MEnschen, nicht perfekt. Und ich werde euch trotzdem lieben!');
$.lang.register('healthsystem.wellbeing.reminder.5', '"Morgen ist noch nicht gekommen, und gestern ist vorbei. Wir leben heute."-Mutter Teresa');
$.lang.register('healthsystem.wellbeing.reminder.6', 'Positiv zu sein ist besser als negativ zu denken!');

// command messages
$.lang.register('healthsystem.wellbeing.command.loaded', '$1 Wohlfühl-Commands gefunden.);
$.lang.register('healthsystem.wellbeing.command.1', 'Im Leben geht es nicht darum, darauf zu warten, dass das Unwetter vorübergeht, sondern darum, zu lernen, im Regen zu tanzen.');
$.lang.register('healthsystem.wellbeing.command.2', 'Wir sollten dankbar sein für all deine schwierigen Zeiten, denn ohne sie wären wir niemals über unsere Stärken gestolpert.');
$.lang.register('healthsystem.wellbeing.command.3', 'Glaube dass DU es kannst & du hast den halben Weg geschafft!');
$.lang.register('healthsystem.wellbeing.command.4', 'Schöne Dinge passieren, wenn man vom Negativen Abstand nimmt.');
$.lang.register('healthsystem.wellbeing.command.5', 'Ein kleiner positiver Gedanke beim Aufstehen kann einem den ganzen Tag versüßen.');
$.lang.register('healthsystem.wellbeing.command.6', 'Das Leben ist hart, doch ihr seid härter.');
$.lang.register('healthsystem.wellbeing.command.7', 'Wir verlieren nie. Entweder wir gewinnen, oder wir lernen.');
$.lang.register('healthsystem.wellbeing.command.8', 'Schönheit beginnt mit dem Entschluss, du selbst zu sein.');
$.lang.register('healthsystem.wellbeing.command.9', 'Das Leben geht zu schnell vorbei. Also lacht, liebt und probiert neue Dinge. Vergebt, vergesst und hegt keinen Groll. Wählt die Glücklichkeit!');


/**
 * health toggle strings
 */
$.lang.register('healthsystem.toggle.usage', 'Verwendung: !$1 toggle [ hydration | hunger | movement | sleep | wellbeing ].');
$.lang.register('healthsystem.toggle.setting.pass', '$1 wurde gesetzt auf $2.');
$.lang.register('healthsystem.toggle.setting.fail', '$1 Schalter nicht gefunden.');

/**
 * health set strings
 */
$.lang.register('healthsystem.settings.set.hydration','$2 Einstellung wurde geändert auf Hydration $3: $4');
$.lang.register('healthsystem.settings.set.hunger','$2 Einstellung wurde geändert auf Hunger $3: $4');
$.lang.register('healthsystem.settings.set.movement','$2 Einstellung wurde geändert auf Movement $3: $4');
$.lang.register('healthsystem.settings.set.sleep','$2 Einstellung wurde geändert auf Sleep $3: $4');
$.lang.register('healthsystem.settings.set.wellbeing','$2 Einstellung wurde geändert auf Wellbeing $3: $4');