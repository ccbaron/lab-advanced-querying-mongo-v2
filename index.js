// ¡Buena suerte! Mira los apunts de clase o https://www.w3schools.com/nodejs/nodejs_mongodb.asp
/**
 * Necesitas ejecutar en el terminal:
 * 
 * 1. npm init -y
 * 2. npm install mongodb
 */
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://sololectura:sololectura@cluster0.c8tq0vp.mongodb.net');

async function run() {
    try {
        await client.connect();
        const db = client.db('companiesDB'); // usa el que pusiste en el URI
        const companies = db.collection('companies'); // suponiendo que la colección se llama así

        // Iteration 2: 1. All the companies whose name match 'Babelgum'. Retrieve only their `name` field.

        const results = await companies.find(
            { name: 'Babelgum' },
            { projection: { name: 1, _id: 0 } }
        ).toArray();

        console.log("All the companies whose name match 'Babelgum'. Retrieve only their `name` field.", results);

        // Iteration 2.2: All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by *number of employees
        const results2 = await companies.find(
            { number_of_employees: { $gt: 5000 } },
            { projection: { number_of_employees: 1, name: 1, _id: 0 } },
            { limit: 20 },
        ).sort({ number_of_employees: -1 }).toArray();

        console.log("All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by *number of employees", results2);

        // Iteratoin 2.3:  All the companies founded between 2000 and 2005, both years included. Retrieve only the `name` and `founded_year` fields.
        // A las 21.55
        const results3 = await companies.find(
            { $and: [{ founded_year: { $gte: 2000 } }, { founded_year: { $lte: 2005 } }] },
            { projection: { name: 1, founded_year: 1 } }
        ).toArray();

        console.log("All the companies founded between 2000 and 2005, both years included. Retrieve only the `name` and `founded_year` fields.", results3);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }

}

run();

