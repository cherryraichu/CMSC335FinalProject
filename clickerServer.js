"use strict";
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser"); /* To handle post parameters */
require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
/*const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseAndCollection = {db: "CMSC335_DB", collection:"campApplicants"};*/
const { MongoClient, ServerApiVersion } = require('mongodb');
let client = null;

main();

// (Annie) TODO ROUTES:






async function main()
{
    //1. Setup the express server
    app.set("view engine", "ejs"); //Set app view engine as ejs  
    app.set("views", path.resolve(__dirname, "templates")); //Set app setting for views to templates folder 
    app.use(bodyParser.urlencoded({extended:false}));
    const args = process.argv;

    //2. Command Line Parsing
    let portNum = 0;
    if (args.length != 3) { 
        console.log("usage: node clickerServer.js [portNumber]")
        process.exit(0);
        }
    else { portNum = args[2]; }
    app.listen(portNum); //Set app to listen for requests
    console.log(`Webserver started and running at http://localhost:${portNum}`);

    //3. Connect to the mongoDB database

    const { MongoClient, ServerApiVersion } = require('mongodb');
    require("dotenv").config({ path: path.resolve(__dirname, 'credentials/.env') })
    const user = process.env.MONGO_DB_USERNAME 
    const pass = process.env.MONGO_DB_PASSWORD
    const database = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION}

    const uri = `mongodb+srv://${user}:${pass}@cluster0.pd476b3.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
        await client.connect();
        console.log("Connected to the database")
        } catch (e) {
        console.error(e);
    } 

    //4. Listen for user-shut down command
    console.log("Stop to shutdown the server: ")
    process.stdin.on('data', (dataInput) => {
        if (dataInput !== null) {
            dataInput = dataInput.toString().trim();
            if (dataInput === "stop") {
                console.log("Shutting down the server");
               // client.close();
                process.exit(0);
            }
            else { console.log(`Invalid command: ${dataInput}`);}
            console.log("Stop to shutdown the server: ");
        }
    });
}


