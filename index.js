"using strict";
//Importing request Library
const request = require("request");

//Importing cheerio Library
const cheerio = require("cheerio");

// const url = "https://timesofindia.indiatimes.com/";

request(
  "https://timesofindia.indiatimes.com/",
  function (error, response, html) {
    let arraytotallinks = [];

    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("a").each((i, el) => {
        // const item = $(el).text();
        const link = $(el).attr("href");

        arraytotallinks.push(link.trim());

        // console.log(link);
      });
    } else {
      console.log(response.status);
    }

    // console.log(arraylinks);
    // console.log(arraylinks.length);
    // console.log(arraylinks[1]);

    let i;
    let arrayvalidlinks = [];
    // const patt = new RegExp('/articlelist/[0-9][".cms"];');

    for (i = 0; i < arraytotallinks.length; i++) {
      if (arraytotallinks[i].includes("/article")) {
        // console.log(arraylinks[i]);
        arrayvalidlinks.push(arraytotallinks[i]);
      }
    }

    console.log(`total numbers of links are ${arraytotallinks.length}`);
    console.log(`total valid numbers links are ${arrayvalidlinks.length}`);
    console.log(
      `total unvalid numbers of links are ${
        arraytotallinks.length - arrayvalidlinks.length
      }`
    );

    console.log(arrayvalidlinks);
  }
);

/*

//Importing axios Library
const axios = require('axios')
//Importing cheerio Library
const cheerio = require("cheerio");

axios.get('https://timesofindia.indiatimes.com/').then(
    (response)=>{
        const $ = cheerio.load()
    }
)
*/
