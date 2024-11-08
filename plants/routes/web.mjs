import express from 'express';
import { getAllPlants } from '../services/plants.mjs';

const appRoutes = express.Router();

// insert code in the space available to fetch the data you need.
// There is a controller available for you to use to fetch some plant data.
// getAllPlants()
// Will Return: all plants
// Extension: if you implement a search feature, you can pass the query parameter
// as an argument to the above controller to return a result for a specific plant.


appRoutes.get('/', async (req, res, next) => {
    const query = req.query.plant || null;
    try {
        const plants = await getAllPlants(query);

        // Check if the request is an AJAX call (could use a custom header or query param)
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            res.render('plantsList.njk', { plants });
        } else {
            res.render('index.njk', { plants });
        }
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).send('An error occurred while fetching plants.');
    }
});


export default appRoutes;