import * as nanoid from "nanoid";


export default class Token {

	Id:String;
	Creation:number;
	Data:Object;
	Expiration:number;

	constructor (Data, Expiration) {

		this.Id = nanoid (256);
		this.Creation = Date.now ();
		this.Data = Data;
		this.Expiration = new Date (Expiration).getTime ();
	}
}