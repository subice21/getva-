var URL = require('url-parse');
var cheerio = require('cheerio');
var request = require('request');

var AlumunumURl = "";
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
        .find('div','<div class="general-layout_common-structure__2SGmF refactor">')
        .find('div', '<div class="general-layout_common-structure-row__dqxvs">')
        .find('div','<div class="grid gap-4 tablet:gap-6 grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12 grid-container--fixed-desktop general-layout_main__3tg3t">')
        .find('main','<main class="w-auto col-end-4 col-end-4 tablet:col-end-8 desktop:col-end-8">')
        .find('div','<div class="instrument-page_instrument-page__2xiQP relative">')
        .find('div','<div class="instrument-header_instrument-header__1SRl8 instrument-page_section__79xMl tablet:grid tablet:grid-cols-2">')
        .find('div','<div class="instrument-header_instrument-name__3u05Y" data-test="instrument-headline">')
        .find('div','<div data-test="instrument-header-details">')
        .find('div','<div class="instrument-price_instrument-price__3uw25 instrument-price_instrument-price-lg__3ES-Q flex items-end flex-wrap">')

        info.push(linkHref);
    });
  
   
    var lead = info['0'].find('span', '<span class="instrument-price_last__KQzyA" data-test="instrument-price-last">');
    CuWorth = [];
    lead.each(function(i, elem){
        if($(this).text() != ''){
            CuWorth.push($(this).text().trim())
        }
    }); 
    
    if (CuWorth[21] != null){
        var convert = CuWorth[21];
        var returnStr = Number(convert[0]+'.'+convert[2]+convert[3]+convert[4]);
        return (returnStr) ;
    } 
    
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





