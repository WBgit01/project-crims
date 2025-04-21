const express = require('express');
const request = require('supertest');
const transportResourceRoutes = require('../routers/transport_resource_router.js');

// Mock controller functions
jest.mock('../controllers/transport_resource_controller.js', () => ({
  getTransportResources: (req, res) => res.status(200).json({ route: 'getTransportResources' }),
  getTransportResource: (req, res) => res.status(200).json({ route: 'getTransportResource', id: req.params.transport_id }),
  createTransportResource: (req, res) => res.status(201).json({ route: 'createTransportResource', data: req.body }),
  updateTransportResource: (req, res) => res.status(200).json({ route: 'updateTransportResource', id: req.params.transport_id }),
  patchTransportResource: (req, res) => res.status(200).json({ route: 'patchTransportResource', id: req.params.transport_id }),
  deleteTransportResource: (req, res) => res.status(200).json({ route: 'deleteTransportResource', id: req.params.transport_id })
}));

// Create a test app
const app = express();
app.use(express.json());
app.use('/transport_resources', transportResourceRoutes);

describe('Transport Resource Routes', () => {
  test('GET /transport_resources returns all transport resources', async () => {
    const res = await request(app).get('/transport_resources');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('getTransportResources');
  });

  test('GET /transport_resources/:transport_id returns a single transport resource', async () => {
    const res = await request(app).get('/transport_resources/101');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('getTransportResource');
    expect(res.body.id).toBe('101');
  });

  test('POST /transport_resources creates a new transport resource', async () => {
    const res = await request(app).post('/transport_resources').send({ type: 'Bus', capacity: 50 });
    expect(res.statusCode).toBe(201);
    expect(res.body.route).toBe('createTransportResource');
    expect(res.body.data).toEqual({ type: 'Bus', capacity: 50 });
  });

  test('PUT /transport_resources/:transport_id updates a transport resource', async () => {
    const res = await request(app).put('/transport_resources/101').send({ capacity: 60 });
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('updateTransportResource');
    expect(res.body.id).toBe('101');
  });

  test('PATCH /transport_resources/:transport_id patches a transport resource', async () => {
    const res = await request(app).patch('/transport_resources/101').send({ status: 'Operational' });
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('patchTransportResource');
    expect(res.body.id).toBe('101');
  });

  test('DELETE /transport_resources/:transport_id deletes a transport resource', async () => {
    const res = await request(app).delete('/transport_resources/101');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('deleteTransportResource');
    expect(res.body.id).toBe('101');
  });
});
