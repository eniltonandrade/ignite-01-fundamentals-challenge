import { Readable } from 'node:stream'
import { parse } from 'csv-parse';


import fs from 'node:fs';

const filePath = new URL('./input.csv', import.meta.url);

const fileStream = fs.createReadStream(filePath);

const parser = parse({
    delimiter: ',',
    fromLine: 1
});

async function execute(){
    const lines = fileStream.pipe(parser);
    
    for await (const line of lines) {
        console.log(line);
        const [ title, description ] = line;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
            })
    }
    
}

await execute();