"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(user, pass){
    return {
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, params, cb) {            
            request(URL, (error, response, body) => { 
                if(body)
                   body = this.convertReport(params, body);
                
                cb(error, body); 
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
                   
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @see http://wiki.netaffiliation.com/doku.php/index?id=en/diffuseurs/outils-techniques/webservices
         * @param object params 
         * debut: Query start date in YYYY-MM-DD format
         * fin: Query end date in YYYY-MM-DD format
         * etat: Status of Transactions: v - Pending, a - Confirmed, r - Cancelled (default 'vra')
         * dim: Specify the pooling criterion for statistical information: 1 - Campaign, 2 -Site, 3 - Day, 4 - Month
         * @param function cb
         */
        report: function(params, cb){
            params['authl'] = user;
            params['authv'] = pass;
            let URL = this.createurl("https://stat.netaffiliation.com/listing.php", params);
            console.log(URL);
            this.getinapi(URL, params, cb);
        },
        
        
        /**
         * Convert report by DIM param
         * 
         * @see http://wiki.netaffiliation.com/doku.php/index?id=en/diffuseurs/outils-techniques/webservices
         * @param object params
         * @param string body
         * @return object
         */
        convertReport: function(params, body){
            var bodyJSON = [];
                        
            var headers = {
                1: ["idcamp","nomcamp","monnaie","affcpt","affval","clicpt","clival","dclcpt","dclval","foratt","forval","venatt","venval","gaiatt","gaival"],
                2: ["idsite","nomsite","monnaie","affcpt","affval","clicpt","clival","dclcpt","dclval","foratt","forval","venatt","venval","gaiatt","gaival"],
                3: ["date","monnaie","affcpt","affval","clicpt","clival","dclcpt","dclval","foratt","forval","venatt","venval","gaiatt","gaival"],
                4: ["date","monnaie","affcpt","affval","clicpt","clival","dclcpt","dclval","foratt","forval","venatt","venval","gaiatt","gaival"]
            };
            
            var linesBody = body.split("\n");
            
            for(let key = 1; key < linesBody.length-1; key++){
                var lineSlip = linesBody[key].split(";");
                var lineJSON = {};
                
                for(let key2 in lineSlip)
                    lineJSON[headers[params.dim][key2]] = lineSlip[key2];
                
                bodyJSON.push(lineJSON);
            }
                                
            return bodyJSON;
        }
    }
}
