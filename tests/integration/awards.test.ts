import request from 'supertest';
import { app, init } from '../../src/server';


beforeAll(async () => {
  await init(); // Inicializa o banco de dados e outras configurações
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
});

describe('GET /api/producers', () => {
  it('should return a list of producers awards', async () => {
    const response = await request(app).get('/api/producers');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
    response.body.min.forEach((item: any) => {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    });
    response.body.max.forEach((item: any) => {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    });
  });
});