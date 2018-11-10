"use strict";
exports.__esModule = true;
/**
 * Imports
 */
var BlowFish = require("egoroof-blowfish");
var Base64Module = require("js-base64");
/**
 * Get the Base64 functionality.
 *
 * @var {Object}
 */
var Base64 = Base64Module.Base64;
/**
 * Configure BlowFish for the ecryption.
 *
 * @var {BlowFish}
 */
var Configure = function (Key) { return new BlowFish(Key, BlowFish.MODE.ECB, BlowFish.PADDING.NULL); };
/**
 * Validate a received Token
 *
 * @var {Date}
 */
var ValidadeToken = function (Expiration) { return Date.now() < new Date(Expiration).getTime(); };
/**
 * Encode the recived Token based on a given key.
 *
 * @return {String}
 */
function Encode(Token, Key) {
    // Create a new BlowFish instance and configure it.
    var BF = Configure(Key);
    // Create a Base64 from a JSON representation of the Token.
    var Base64Token = Base64.encodeURI(JSON.stringify({
        i: Token.Id,
        c: Token.Creation,
        d: Token.Data,
        e: Token.Expiration
    }));
    // Return the encoded Token as a base64 string.
    return Base64.encodeURI(BF.encode(Base64Token));
}
exports.Encode = Encode;
/**
 * Decode the received Token based on a given key.
 *
 * @return {String}
 */
function Decode(PublicBase64, Key) {
    // Create a new BlowFish instance and configure it.
    var BF = Configure(Key);
    // Decode the Base64 string of the Token.
    var DecodedBase64 = Base64.decode(PublicBase64);
    // Turn the decoded Base64 into an Uint8Array and decode it with BlowFish.
    var DecodedBase64Token = BF.decode(new Uint8Array(DecodedBase64.split(",")));
    try {
        var DecodedToken = JSON.parse(Base64.decode(DecodedBase64Token));
        // Return an representation of the Token.
        return {
            Id: DecodedToken.i,
            Creation: DecodedToken.c,
            Data: DecodedToken.d,
            Expiration: DecodedToken.e
        };
    }
    catch (error) {
        return null;
    }
}
/**
 * Validate a Token by your Id.
 *
 * @return {any}
 */
function Validate(PublicBase64, Key) {
    // Try decode the Token.
    var DecodedToken = Decode(PublicBase64, Key);
    // If it was decoded properly, check your expiration date and return it.
    // Else, return null.
    if (DecodedToken && ValidadeToken(DecodedToken["Expiration"])) {
        return DecodedToken["Data"];
    }
    else {
        return null;
    }
}
exports.Validate = Validate;
