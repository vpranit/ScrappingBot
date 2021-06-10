//Importing request Library
const request = require("request");

//Importing cheerio Library
const cheerio = require("cheerio");

// const url = "https://timesofindia.indiatimes.com/";

request(
  "https://timesofindia.indiatimes.com/",
  function (error, response, html) {
    // console.log(html);

    if (!error && response.statusCode >= 200 /* && response.status < 300 */) {
      console.log("this 200");
      const $ = cheerio.load(html);

      $("a").each((i, el) => {
        const item = $(el).text();
        const link = $(el).attr("href");
        let arraylinks = [];

        arraylinks.push(link.trim());

        // console.log(link);

        console.log(arraylinks);
      });
    } else {
      console.log(response.status);
      console.log("this is else");
    }
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
