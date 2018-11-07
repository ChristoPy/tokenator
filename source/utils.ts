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
export function Encode (ToEncode, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	// Return the encoded Token as a base64 string.
	return Base64.encodeURI (BF.encode (ToEncode));
}


/**
 * Decode the received Token based on a given key.
 *
 * @return {String}
 */
export function Decode (ToDecode, Key):String {

	// Create a new BlowFish instance and configure it.
	const BF = Configure (Key);

	const DecodedBase64 = Base64.decode (ToDecode);

	// Return the decoded Token as a string.
	return BF.decode (new Uint8Array (Array.from (DecodedBase64.split (","))));
}