# Netaffiliation API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/itsimpleapp/netaffiliation-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/netaffiliation-api.svg)](https://badge.fury.io/js/netaffiliation-api)

API integration with Netaffiliation

## Install

```bash
$ npm install netaffiliation-api
```

## Documentation

* Webservice API - http://wiki.netaffiliation.com/doku.php/index?id=en/diffuseurs/outils-techniques/webservices

## Usage

```js
"use strict";

let NetAffiliation = require("netaffiliation-api"),
    netaffiliation = new NetAffiliation("user webservice", "pass webservice");
    
netaffiliation.report({debut: '2017-06-01', fin: '2017-06-19', dim: 1}, (err, results) => {
    if(err)
        console.log(err);
    else
        console.log(results);
});
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.