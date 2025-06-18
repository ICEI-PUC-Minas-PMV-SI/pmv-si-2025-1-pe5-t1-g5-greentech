import express from "express";
import https from "https";
import fs from "fs";

const SERVER_CERT = fs.readFileSync("./certs/localhost.pem", "utf-8");
const SERVER_KEY = fs.readFileSync("./certs/localhost-key.pem", "utf-8");

const options = {
    key: SERVER_KEY,
    cert: SERVER_CERT,
}

const app = express();

const httpsServer = https.createServer(options, app)

export { app, httpsServer };
