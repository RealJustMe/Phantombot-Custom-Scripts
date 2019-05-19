var listSelf = [
	"Versuchst du mit dir selbst zu flirten $1? Wie traurig!"
];

var listOther = [
    "$1 zwinkert $2 an, na was hast du vor? ;)",
    "$1 schenkt $2 das charmanteste Lächeln, da ist doch etwas im Gange!",
    "$1 flirtet beharrlich mit $2... aber $2 ist das scheißegal.",
    "$1 und $2 haben sich gerade geküsst! Wie süß!",
    "$1 winkt $2 zu und möchte einen Drink spendieren! Ja oder nein?",
    "$1 hat Blumen für $2! Liebreizend!",
    "$1 führt ein langes Gespräch mit $2, sie haben eine schöne Zeit, das sehe ich! <3",
    "$1 strengt sich bei $2 an... aber ich bin nicht sicher, ob das zu etwas führt!",
    "$1 hat $2 einen Drink angeboten, ich hoffe er schmeckt! ;)",
    "$2 nimmt den Drink von $1 an, aber ist ein bisschen verlegen! :s",
    "$1 hat $2 an den Hintern gefasst... Ich bin nicht sicher ob das geschätzt wurde!",
    "$1 streichelt $2's Hintern uns $2 zwinkert $1 an!",
    "$1 erschleicht sich einen Kuss von $2! Aber fängt sich einen Schlag ins Gesicht ein!",
    "$1 kuschelt mit $2! Wie süß!",
    "$1 benutzt den besten Anmachspruch bei $2... ob es funktioniert?",
    "$1 gab $2 eine rote Rose! Es liegt Liebe in der Luft!",
    "$1 versucht sexy zu lächeln... aber $2 ist ein bisschen verstört!",
    "$1 hat gerade $2 den besten Witz erzählt, die beiden haben so viel Spaß! <3",
    "$2 rennt weg weil $1 gerade den schrecklichsten Tanz aufgeführt hat!",
    "$1 lassen die Sau auf der Tanzfläche raus $2! Hübsches Paar!",
    "$1 bietet $2 einen Verlobungsring an aber fängt sich eine ein! Sie sind nicht einmal zusammen!",
    "$1 zwinkert $2 an und zeigt in Richtung Schlafzimmer, aber $2 rennt einfach weg!",
    "$1 führt nette Unterwäsche mit Herzchen vor! Aber $2 ist nicht beeindruckt!",
    "$1 macht einen Striptease für $2! Aber fiel hin und bricht sich ein Bein!",
    "$1 gibt $2 einen Luftkuss und bekommt einen zurück! <3",
    "$1 umarmt $2 sehr innig!",
    "$1 macht einen Zaubertrick, um $2 zu beeindrucken! Ob das funktioniert?",
    "$1 hat Armors Pfeil in $s's Herz geschossen... Aber es war ein echter Pfeil und $2 stirbt! Meine Güte!",
    "$1 küsst $2 sehr sanft auf die Hand! Wie edel!",
    "$1 und $2 haben einen sehr langen und leidenschaftlichen Kuss!"
];

var countSelf = 0;
listSelf.forEach(function(item) {
	countSelf++;
	$.lang.register('flirtcommand.self.'+countSelf, item);
});

var countOther = 0;
listOther.forEach(function(item) {
	countOther++;
	$.lang.register('flirtcommand.other.'+countOther, item);
});

$.lang.register('flirtcommand.console.loaded', 'Flirtnachrichten gefunden: $1 mit sich selbst, $2 mit anderen.');
