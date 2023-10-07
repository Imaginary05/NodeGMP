const EventEmitter = require('./EventEmitter'); // Import your custom EventEmitter class
const axios = require('axios'); // Import Axios for making HTTP requests

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');
            console.log('About to execute');

            // Start measuring execution time
            const startTime = process.hrtime();

            // Call the asynchronous function with the provided arguments
            const result = await asyncFunc(...args);

            // Stop measuring execution time
            const endTime = process.hrtime(startTime);

            // Calculate execution time in milliseconds
            const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;

            this.emit('end');
            console.log('Done with execute');

            // Emit event with the result
            this.emit('data', result);

            console.log(`Execution time: ${executionTimeInMs} ms`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

// Register for 'data' event to log the result
withTime.on('data', (result) => console.log('Data:', result));

// Define an asynchronous function to fetch and transform data from a URL
const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return response.data;
};

// Execute the asynchronous function with the timer and event emitting
withTime.execute(fetchData);
