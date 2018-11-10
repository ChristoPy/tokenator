<img src="tokenator.svg" style="margin: 0 auto; display: block;" alt="tokenator"/>
<div style="text-align: center; margin-top: 20px; bottom: 40px;">Create tokens easily.</div>



## Installation
```npm install @christopy/tokenator --save```


## Usage
```js
// Import Tokenator.
const Tokenator = require ("@christopy/tokenator");
```

## Creating Tokens
The returned data is used after to check the Token
```js
const myNewToken = Tokenator.Create ({
    data: "I'm a precious data", // The Token data
    expiration: "05/04/2019",    // When the Token expires (default is 24H)
  },
  "A super secure key"           // The key for the Token encryption (required)
);
```

## Checking Tokens
To check Tokens, your Id is used for it. The id is returned from the ```Tokenator.Create ()``` function.  
If the Id is wrong or the key couldn't decrypt the Token correctly, it returns ```null```.
If the Token is invalid or doesn't exists, it returns ```false```.
If the Token is valid, it returns ```true```.
```js
Tokenator.Check (myNewToken, "A super secure key");
```

## Why web tokens?
Sometimes to learn something you need make your own implementation.

## Version
1.0.4