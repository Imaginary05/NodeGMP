const fs = require('fs');
const csv = require('csv-parser');

function parseCSV(inputFilePath, outputFilePath) {
    const readStream = fs.createReadStream(inputFilePath);
    const writeStream = fs.createWriteStream(outputFilePath);

    readStream
        .pipe(csv({ separator: '\t' }))
        .on('data', (row) => {
            const jsonObject = {
                book: row.Book,
                author: row.Author,
                price: parseFloat(row.Price),
            };

            writeStream.write(JSON.stringify(jsonObject) + '\n');
        })
        .on('end', () => {
            console.log('File conversion completed.');
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
}

module.exports = parseCSV;
