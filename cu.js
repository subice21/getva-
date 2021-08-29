var URL = require('url-parse');
var cheerio = require('cheerio');
var request = require('request');

var CopperUrl = "https://il.investing.com/commodities/copper";
var Copper_Url = new URL(CopperUrl);

var headers1 = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
    'Content-Type' : 'application/x-www-form-urlencoded' 
};

var Copper_GetUrl = {
    headers: headers1,
    uri: Copper_Url
};

function CollectCopper($){
    var info = [];
    $('div').each(function(i, elem){
        var linkHref = $(this)
        .find('section','<section id="leftColumn">')
        .find('div', '<div class="top bold inlineblock">');
        if(linkHref.text() != ''){
            info.push(linkHref); }
    });
    var lead = info['0'].find('span');
    CopperWorth = [];
    lead.each(function(i, elem){
        if($(this).text() != ''){
            CopperWorth.push($(this).text())
        }
    });      
    return (copper = CopperWorth[6] * 2.205); // pound to kilo -> 1p - 0.4535kg ->mutiply for kilo
}

exports.cu = async function(){
    return new Promise((resolve, reject) => {
    copper =[];
    request(Copper_GetUrl, (error, res, body) => {
        if(error){
             reject("Error :" + error);}
        if (res.statusCode === 200) {
            resolve(CollectCopper(cheerio.load(body)));
        }
        if (res.statusCode !== "undefined") { }
            reject("status code: " + res.statusCode);
        if (res.statusCode !== 200) {
            reject("status code: " + res.statusCode);}
        if (res.statusCode === 404) {
            reject("status code: " + res.statusCode);}
   })});    
}