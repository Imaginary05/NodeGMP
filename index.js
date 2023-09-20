const repl = require('repl');

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

const replServer = repl.start();

replServer.context.getRandomNumber = getRandomNumber;