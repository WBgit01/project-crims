const request = require('supertest');
const express = require('express');
const crimeRoutes = require('../routers/crime_router.js');

// Mock controller functions
jest.mock('../controllers/crime_controller.js', () => ({
    getCrimes: (req, res) => res.status(200).json({ message: "All crimes" }),
    getCrime: (req, res) => res.status(200).json({ message: `Crime ${req.params.crime_id}` }),
    reportCrime: (req, res) => res.status(201).json({ message: "Crime reported" }),
    updateCrime: (req, res) => res.status(200).json({ message: `Crime ${req.params.crime_id} updated` }),
    patchCrime: (req, res) => res.status(200).json({ message: `Crime ${req.params.crime_id} patched` }),
    deleteCrime: (req, res) => res.status(200).json({ message: `Crime ${req.params.crime_id} deleted` })
}));

// Create a test app
const app = express();
app.use(express.json());
app.use('/crimes', crimeRoutes);

describe('Crime Routes', () => {
    test('GET /crimes returns all crimes', async () => {
        const res = await request(app).get('/crimes');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('All crimes');
    });

    test('GET /crimes/:crime_id returns a single crime', async () => {
        const res = await request(app).get('/crimes/123');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Crime 123');
    });

    test('POST /crimes reports a new crime', async () => {
        const res = await request(app).post('/crimes').send({ type: 'Theft' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Crime reported');
    });

    test('PUT /crimes/:crime_id updates a crime', async () => {
        const res = await request(app).put('/crimes/123').send({ type: 'Updated Theft' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Crime 123 updated');
    });

    test('PATCH /crimes/:crime_id patches a crime', async () => {
        const res = await request(app).patch('/crimes/123').send({ status: 'Closed' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Crime 123 patched');
    });

    test('DELETE /crimes/:crime_id deletes a crime', async () => {
        const res = await request(app).delete('/crimes/123');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Crime 123 deleted');
    });
});
