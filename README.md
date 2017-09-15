<p align="">
    <a href="http://www.xe.com" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/en/5/55/XE_Corporation_logo.png" width="90" height="72"/>
    </a>
</p>

# XE Currency Data Client - Node.js

XE.com Inc. is the World's Trusted Currency Authority. This project provides an SDK to interface with our XE Currency Data (XECD) product.

XE Currency Data is a REST API that gives you access to daily or live rates and historic mid-market conversion rates between all of our supported currencies. 

You will need an api key and secret to use this sdk. Sign up for a [free trial][5] or register for a [full account][6].

## Installation

The preferred way to install this package is through [npm][4].

```
npm install --save @xe/xecd-rates-client
```

This package follows [semantic versioning][3].

## Usage

```javascript
var xecdApiClient = require('@xe/xecd-rates-client')

var xecdConfig = {
    username: '<YOUR_API_ACCOUNT_ID>',
    password: '<YOUR_API_KEY>',
    apiUrl: 'https://xecdapi.xe.com/v1/'
};

var client = new xecdApiClient.XECD(xecdConfig);

client.accountInfo(function(err,data){
  console.log("accountInfo");
  console.log(err);
  console.log(data);
});

client.currencies(function(err,data){
  console.log("currencies");
  console.log(err);
  console.log(data);
});


client.convertFrom(function(err,data){
  console.log("convertFrom");
  console.log(err);
  console.log(data);
});

client.convertTo(function(err,data){
  console.log("convertTo");
  console.log(err);
  console.log(data);
});


client.historicRate(function(err,data){
  console.log("historicRate");
  console.log(err);
  console.log(data);
});

client.historicRatePeriod(function(err,data){
  console.log("historicRatePeriod");
  console.log(err);
  console.log(data);
});
```

## Documentation

[Technical Specifications][2]

## Contributing

xecd-rates-client-node is an open-source project. Submit a pull request to contribute!

## Testing

```bash
npm test
```

## Security Issues

If you discover a security vulnerability within this package, please **DO NOT** publish it publicly. Instead, contact us at **security [at] xe.com**. We will follow up with you as soon as possible.

## About Us

[XE.com Inc.][1] is The World's Trusted Currency Authority. Development of this project is led by the XE.com Inc. Development Team and supported by the open-source community.

[1]: http://www.xe.com
[2]: http://www.xe.com/xecurrencydata/XE_Currency_Data_API_Specifications.pdf
[3]: http://semver.org/
[4]: https://www.npmjs.com/
[5]: https://xecd.xe.com/account/signup.php?freetrial
[6]: http://www.xe.com/xecurrencydata/
