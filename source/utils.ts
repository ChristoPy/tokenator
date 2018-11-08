/**
 * Imports
 */
import * as BlowFish from "egoroof-blowfish";
import * as Base64Module from "js-base64";



/**
 * Get the Base64 functionality.
 *
 * @var {Object}
 */
const Base64 = Base64Module.Base64;


/**
 * Configure BlowFish for the ecryption.
 *
 * @var {BlowFish}
 */
const Configure = (Key) => new BlowFish (Key, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);

/**
 * Validate a received Token
 *
 * @var {Date}
 */
const ValidadeToken = (Expiration) => Date.now () < new Date (Expiration).getTime ();



/**
 * Encode the recived Token based on a given key.
 *
 * @return {String}
 */
export function Encode (Token, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	// Create a Base64 from a JSON representation of the Token.
	const Base64Token = Base64.encodeURI (JSON.stringify ({
		i: Token.Id,
		c: Token.Creation,
		d: Token.Data,
		e: Token.Expiration
	}));

	// Return the encoded Token as a base64 string.
	return Base64.encodeURI (BF.encode (Base64Token));
}

/**
 * Decode the received Token based on a given key.
 *
 * @return {String}
 */
function Decode (PublicBase64, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	// Decode the Base64 string of the Token.
	const DecodedBase64 = Base64.decode (PublicBase64);

	// Turn the decoded Base64 into an Uint8Array and decode it with BlowFish.
	const DecodedBase64Token = BF.decode (new Uint8Array (DecodedBase64.split (",")));

	// Decode the Token and turn it into an Object.
	const DecodedToken = JSON.parse (Base64.decode (DecodedBase64Token));

	// Return an representation of the Token.
	return {
		Id: DecodedToken.i,
		Creation: DecodedToken.c,
		Data: DecodedToken.d,
		Expiration: DecodedToken.e
	} as any;
}

export function Validate (PublicBase64, Key):boolean {

	return ValidadeToken (Decode (PublicBase64, Key)["Expiration"]);
}