const PALETTE_SIZE = 6;

const STOP_WORDS = new Set([
    // Conectores
    "de", "del", "la", "las", "el", "los", "y", "e", "en", "con", "para", "por",
    // Sufijos legales en México
    "s", "sa", "cv", "sc", "rl", "sapi", "sab", "sas", "ac", "spr", "ri",
    // Sufijos legales en inglés
    "inc", "llc", "ltd", "corp", "co"
]);

module.exports = {
    PALETTE_SIZE,
    STOP_WORDS
}