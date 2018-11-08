"use strict";
exports.__esModule = true;
/**
 * Imports
 */
var nanoid = require("nanoid");
/**
 * Main Token class.
 */
var Token = /** @class */ (function () {
    /**
     * Creates a new Token instance based on the received informations.
     */
    function Token(Data, Expiration) {
        // Set the Token Id.
        this.Id = nanoid(32);
        // Set the Token timestamp.
        this.Creation = Date.now();
        // Set the Token content.
        this.Data = Data;
        // Try create a timestamp based on the received Date or a timestamp from "tomorrow" if no Date be received.
        var ExpirationDate = new Date(Expiration).getTime() || new Date().setDate(new Date().getDate() + 1);
        // If the current timestamp be higher than ExpirationDate (will happen if the received Date be wrong),
        // set the Token Expiration as "tomorrow", else set as the defined ExpirationDate;
        if (ExpirationDate < new Date().getTime()) {
            this.Expiration = new Date().setDate(new Date().getDate() + 1);
        }
        else {
            this.Expiration = ExpirationDate;
        }
    }
    return Token;
}());
exports["default"] = Token;
