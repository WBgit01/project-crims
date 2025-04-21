const express = require('express');
const request = require('supertest');
const humanResourceRoutes = require('../routers/human_resource_router.js');

// Mock controller functions
jest.mock('../controllers/human_resource_controller.js', () => ({
  getHumanResources: (req, res) => res.status(200).json({ route: 'getHumanResources' }),
  getHumanResource: (req, res) => res.status(200).json({ route: 'getHumanResource', id: req.params.human_res_id }),
  createHumanResource: (req, res) => res.status(201).json({ route: 'createHumanResource', data: req.body }),
  updateHumanResource: (req, res) => res.status(200).json({ route: 'updateHumanResource', id: req.params.human_res_id }),
  patchHumanResource: (req, res) => res.status(200).json({ route: 'patchHumanResource', id: req.params.human_res_id }),
  deleteHumanResource: (req, res) => res.status(200).json({ route: 'deleteHumanResource', id: req.params.human_res_id })
}));

const app = express();
app.use(express.json());
app.use('/human_resources', humanResourceRoutes);

describe('Human Resource Routes', () => {
  test('GET /human_resources returns all human resources', async () => {
    const res = await request(app).get('/human_resources');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('getHumanResources');
  });

  test('GET /human_resources/:human_res_id returns a single human resource', async () => {
    const res = await request(app).get('/human_resources/101');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('getHumanResource');
    expect(res.body.id).toBe('101');
  });

  test('POST /human_resources creates a new human resource', async () => {
    const res = await request(app).post('/human_resources').send({ name: 'John Doe', position: 'Manager' });
    expect(res.statusCode).toBe(201);
    expect(res.body.route).toBe('createHumanResource');
    expect(res.body.data).toEqual({ name: 'John Doe', position: 'Manager' });
  });

  test('PUT /human_resources/:human_res_id updates a human resource', async () => {
    const res = await request(app).put('/human_resources/101').send({ position: 'Senior Manager' });
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('updateHumanResource');
    expect(res.body.id).toBe('101');
  });

  test('PATCH /human_resources/:human_res_id patches a human resource', async () => {
    const res = await request(app).patch('/human_resources/101').send({ status: 'Active' });
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('patchHumanResource');
    expect(res.body.id).toBe('101');
  });

  test('DELETE /human_resources/:human_res_id deletes a human resource', async () => {
    const res = await request(app).delete('/human_resources/101');
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBe('deleteHumanResource');
    expect(res.body.id).toBe('101');
  });
});
