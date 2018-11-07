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
 * Encode the recived Token based on a given key.
 *
 * @return {String}
 */
export function Encode (Token, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	// Create a Base64 from a JSON representation of the Token.
	const Base64Token = Base64.encodeURI (JSON.stringify (Token));

	// Return the encoded Token as a base64 string.
	return Base64.encodeURI (BF.encode (Base64Token));
}


/**
 * Decode the received Token based on a given key.
 *
 * @return {String}
 */
export function Decode (PublicBase64, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	// Decode the Base64 string of the Token.
	const DecodedBase64 = Base64.decode (PublicBase64);

	// Decode the decoded Base64 as a new Base64.
	const DecodedBase64Token = BF.decode (new Uint8Array (Array.from (DecodedBase64.split (","))));

	// Decode the new Base64 and return your Object representation.
	return JSON.parse (Base64.decode (DecodedBase64Token));
}