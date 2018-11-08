const Utils = require ("./../distribution/utils.js");
const Token = require ("./../distribution/token.js")["default"];


const KEY = "this is a very strong key, okay?";


const ValidToken = new Token ({
	test: "a simple test"
});

console.log (ValidToken);
console.log ();



let EncodedToken = Utils.Encode (ValidToken, KEY);

console.log (EncodedToken);
console.log ();



let IsValid = Utils.Validate (EncodedToken, KEY);

console.log (IsValid); // true
console.log ();



const InvalidToken = new Token ({
	test: "another simple test"
}, new Date ().setDate (new Date ().getDate () - 1)); // Get yesterday.

console.log (InvalidToken);
console.log ();



EncodedToken = Utils.Encode (InvalidToken, KEY);

console.log (EncodedToken);
console.log ();



IsValid = Utils.Validate (EncodedToken, KEY);

console.log (IsValid); // false