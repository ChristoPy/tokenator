/**
 * BlowFish package for data encryption.
 *
 * @var {Object}
 */
const BlowFish = require ("egoroof-blowfish");


/**
 * Configure BlowFish for the ecryption.
 *
 * @var {BlowFish}
 */
const Configure = (Key) => new BlowFish (Key, BlowFish.MODE.ECB, BlowFish.PADDING.NULL);


/**
 * Encode the recived Token based on a given key.
 *
 * @return {Uint8Array}
 */
export function Encode (ToEncode, Key):Uint8Array {

	const BF = Configure (Key);
	return BF.encode (ToEncode);
}


/**
 * Decode the received Token based on a given key.
 *
 * @return {String}
 */
export function Decode (ToDecode, Key):String {

	const BF = Configure (Key);
	return BF.decode (ToDecode, BlowFish.TYPE.STRING);
}