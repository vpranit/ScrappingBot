"using strict";

//Importing request Library
const request = require("request");

//Importing cheerio Library
const cheerio = require("cheerio");

//Importing mySql
const mysql = require("mysql");

// //Importing express
// const express = require("express");

//
// creating connection with local database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "Scrapping",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

//Requesting data from the link
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

    //
    //
    //
    //
    // console.log(arrayvalidlinks);

    var sql = `insert into Artical (articallink) values ?`;

    //****
    // let val = ["google", "chrome", "firefox"];

    // sql = mysql.format(sql, [val]);

    // console.log(sql);
    // process.exit();

    let query1 = "INSERT INTO Artical (articallink) VALUES ";
    arrayvalidlinks.forEach((item,index,arr) => {
       (arrayvalidlinks[index] == arrayvalidlinks[arrayvalidlinks.length - 1])? query1 += `("${arrayvalidlinks[index]}") ` : query1 += `("${arrayvalidlinks[index]}"), `;});
    
    con.query(query1);
    console.log(arrayvalidlinks.length - 1);
    console.log(query1);

    /*
    con.query(sql, [val], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });

    // const sql = "INSERT INTO Artical (articallink) VALUES ?";

    ////
    for (a = 0; a < arrayvalidlinks.length; a++) {
      con.query(
        `insert into Artical (articallink) values (?) [${arrayvalidlinks[a]}]`
        // `INSERT INTO Artical (articallink) VALUES (${arrayvalidlinks[a]})`
      );

      console.log("this is connection ");

      // con.query(sql, arrayvalidlinks[a], function (err, result) {
      //   if (err) throw err;
      //   console.log("Number of records inserted: " + result.affectedRows);
      // });
    }
    ////
    */
  }
);
