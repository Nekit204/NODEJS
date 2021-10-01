const http = require ('http');
const { stdin, stdout } = require('process');
const PORT = 5000;
const NORM = 'norm', STOP = 'stop', TEST = 'test', IDLE = 'idle', EXIT = 'exit';
const express = require("express");
const app = express();
let currentState = NORM;



http.createServer((req, resp) => {
    stdin.setEncoding('utf-8');
    stdin.on('readable', () => {
        let chunk = null;
        while((chunk = stdin.read()) !== null) {
            let newState = chunk.toLowerCase().trim();

            if(newState === EXIT) {
                process.exit(0);
            }
            else if([NORM, STOP, TEST, IDLE].indexOf(newState.toLowerCase()) !== -1 &&
                newState !== currentState) {
                stdout.write(`reg = ${currentState}--> ${newState}\n`);
                currentState = newState;
            }
            else {
                stdout.write(chunk);
            }
            stdout.write(`${currentState}->`);
        }

    });
    resp.end(currentState);


}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);

    stdout.write(`${currentState}->`);
});