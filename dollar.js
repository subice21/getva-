var URL = require('url-parse');
var cheerio = require('cheerio');
var request = require('request');

var headers1 = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
    'Content-Type' : 'application/x-www-form-urlencoded' 
};

var START_URL = "";
var url = new URL(START_URL);

var url_Obj = {
    headers: headers1,
    uri: url
};

function collectInternalLinks($){
    info = [];
    $('table').each(function(i, elem){
        var linkHref = $(this).find('tbody')
        info.push(linkHref.find('tr'));
        if(info.length > 0){ return;}
    });
    var lead = info['0'].find('td');
    text = [];
    lead.each(function(i, elem){
        if($(this).text() != ''){
            text.push($(this).text())}
    });
   /* i=0;
    while(i < text.length){
        log(text.slice(i,i+5));
        i+=5;
      };*/
    Shekel = text[3];
    return(Shekel);
}

exports.dollar = async function(){
    return new Promise((resolve, reject) => {
    Shekel = [];
    request(url_Obj, (error, res, body)=>{
        if(error){
           reject("Error :" + error);}
        if(res.statusCode === 200){
            resolve(collectInternalLinks(cheerio.load(body)));
        }
        if(res.statusCode !== "undefined"){
            reject("status code: " + res.statusCode);}
        if(res.statusCode !== 200){
            reject("status code: " + res.statusCode);}       
        if(res.statusCode === 404){
            reject("status code: " + res.statusCode);}
    }); 
})}
