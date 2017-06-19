/**
 * NetAffiliation API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see http://wiki.netaffiliation.com/doku.php/index?id=en/diffuseurs/outils-techniques/webservices
 */

"use strict";

let NetAffiliation = require("./index.js"),
    netaffiliation = new NetAffiliation("user webservice", "pass webservice");
    
netaffiliation.report({debut: '2017-06-01', fin: '2017-06-19', dim: 1}, (err, results) => {
    if(err)
        console.log(err);
    else
        console.log(results);
});
