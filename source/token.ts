/**
 * Imports
 */
import * as nanoid from "nanoid";


/**
 * Main Token class.
 */
export default class Token {

	/**
	 * The Token id.
	 *
	 * @return  {String}
	 */
	Id:String;

	/**
	 * A timestamp of when the Token was created.
	 *
	 * @return  {Number}
	 */
	Creation:number;

	/**
	 * The Token content.
	 *
	 * @return  {Any}
	 */
	Data:Object;

	/**
	 * When the Token expires.
	 *
	 * @return  {Number}
	 */
	Expiration:number;


	/**
	 * Creates a new Token instance based on the received informations.
	 */
	constructor (Data, Expiration) {

		// Set the Token Id.
		this.Id = nanoid (32);

		// Set the Token timestamp.
		this.Creation = Date.now ();

		// Set the Token content.
		this.Data = Data;


		// Try create a timestamp based on the received Date or a timestamp from "tomorrow" if no Date be received.
		const ExpirationDate = new Date (Expiration).getTime () || new Date ().setDate (new Date ().getDate () + 1);


		// If the current timestamp be higher than ExpirationDate (will happen if the received Date be wrong),
		// set the Token Expiration as "tomorrow", else set as the defined ExpirationDate;
		if (ExpirationDate < new Date ().getTime ()) {

			this.Expiration = new Date ().setDate (new Date ().getDate () + 1)
		} else {

			this.Expiration = ExpirationDate;
		}
	}
}