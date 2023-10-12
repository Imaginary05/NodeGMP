const repl = require('repl');
const EventEmitter = require('./EventEmitter');
const parseCSV = require('./csvReader');
const getRandomNumber = require('./randomNumber');

const inputFilePath = './csvdirectory/csvfile.csv';
const outputFilePath = './csvdirectory/output.txt';

parseCSV(inputFilePath, outputFilePath);

const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one-time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit('eventOne');
myEmitter.emit('eventOnce');
myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get an array of rawListeners
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after removing one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));


const replServer = repl.start();

replServer.context.getRandomNumber = getRandomNumber;