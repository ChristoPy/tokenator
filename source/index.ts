/**
 * Imports
 */
import Token from "./token";
import * as Utils from "./utils/utils";
import * as LowDB from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";


/**
 * Configure the database.
 */
const DataBase = new LowDB (new FileSync ("./data.json"));


class Tokenator {

	/**
	 * Create a new Token
	 *
	 * @return  {Token}
	 */
	public Create (TokenData = {}, Key):Token {

		// Create a new Token and store it.
		const NewToken = new Token (TokenData["data"], TokenData["expiration"]);

		// Save the created Token on disk.
		DataBase.get ("valid").push (
			{
				id: NewToken.Id,
				token: Utils.Encode (NewToken, Key)
			}
		).write ();

		// Return the Token and your Id.
		return NewToken.Id as any;
	}

	/**
	 * Check if the received Data is a valid Token.
	 *
	 * @return {Boolean}
	 */
	public Check (TokenId, Key):boolean {

		// If the token is invalid, return false.
		if (DataBase.get ("invalid").find ({id: TokenId}).value ()) {

			return false;
		} else {

			// Get the token.
			const Token = DataBase.get ("valid").find ({id: TokenId}).value ();

			// If it exists as a valid one, try to validate.
			if (Token) {

				// Check if is valid.
				const IsValid = Utils.Validate (Token.token, Key);

				// Return true is be valid.
				if (IsValid) {
					return true;
				} else {

					// Remove as valid and add to the invalid Array.
					DataBase.get ("valid").remove ({id: TokenId}).write ();
					DataBase.get ("invalid").push (Token).write ();

					// Return false.
					return false;
				}
			} else {

				// Return null if don't be found.
				return null;
			}
		}
	}
}