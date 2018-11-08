"use strict";
/**
 * Imports
 */
var token_1 = require("./token");
var Utils = require("./utils/utils");
var LowDB = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
/**
 * Configure the database.
 */
var DataBase = new LowDB(new FileSync("./data.json"));
/**
 * Main Tokenator class.
 */
var Tokenator = /** @class */ (function () {
    function Tokenator() {
    }
    /**
     * Create a new Token
     *
     * @return  {Token}
     */
    Tokenator.prototype.Create = function (TokenData, Key) {
        if (TokenData === void 0) { TokenData = {}; }
        // Create a new Token and store it.
        var NewToken = new token_1["default"](TokenData["data"], TokenData["expiration"]);
        // Save the created Token on disk.
        DataBase.get("valid").push({
            id: NewToken.Id,
            token: Utils.Encode(NewToken, Key)
        }).write();
        // Return the Token and your Id.
        return NewToken.Id;
    };
    /**
     * Check if the received Data is a valid Token.
     *
     * @return {Boolean}
     */
    Tokenator.prototype.Check = function (TokenId, Key) {
        // If the token is invalid, return false.
        if (DataBase.get("invalid").find({ id: TokenId }).value()) {
            return false;
        }
        else {
            // Get the token.
            var Token_1 = DataBase.get("valid").find({ id: TokenId }).value();
            // If it exists as a valid one, try to validate.
            if (Token_1) {
                // Check if is valid.
                var IsValid = Utils.Validate(Token_1.token, Key);
                // Return true is be valid.
                if (IsValid) {
                    return true;
                }
                else {
                    // Remove as valid and add to the invalid Array.
                    DataBase.get("valid").remove({ id: TokenId }).write();
                    DataBase.get("invalid").push(Token_1).write();
                    // Return false.
                    return false;
                }
            }
            else {
                // Return null if don't be found.
                return null;
            }
        }
    };
    return Tokenator;
}());
module.exports = new Tokenator();
