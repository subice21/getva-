var URL = require('url-parse');
var cheerio = require('cheerio');
var request = require('request');

var AlumunumURl = "https://il.investing.com/commodities/aluminum";
var Alumunum_url = new URL(AlumunumURl);

var headers1 = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
    'Content-Type' : 'application/x-www-form-urlencoded' 
};

var AluGetUrl = {
    headers: headers1,
    uri: Alumunum_url
};

function CollectAlu($){
    var info = [];
    $('div').each(function(i, elem){
        var linkHref = $(this)
        .find('section','<section id="leftColumn">')
        .find('div', '<div class="top bold inlineblock">');
        if(linkHref.text() != ''){ info.push(linkHref);}
    });
    var lead = info['0'].find('span');
    AluWorth = [];
    lead.each(function(i, elem){
        if($(this).text() != ''){
            AluWorth.push($(this).text())
        }
    });      
    aluminum1 = AluWorth[6];
    return(Number(aluminum1[0]+'.'+aluminum1[2]+aluminum1[3]+aluminum1[4]));
}
exports.alu =  async function(){
    return new Promise((resolve, reject) => {
    aluminum = [];
    request(AluGetUrl, (error, res, body)=>{
        if(error){reject("Error :" + error);}
        if(res.statusCode === 200){
         resolve(CollectAlu(cheerio.load(body)));
        }
        if(res.statusCode !== "undefined"){reject("status code: " + res.statusCode);}
        if(res.statusCode !== 200){reject("status code: " + res.statusCode);}
        if(res.statusCode === 404){ reject("status code: " + res.statusCode);}
    });
})};


