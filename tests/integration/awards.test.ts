import request from 'supertest';
import { app, init } from '../../src/server';

beforeAll(async () => {
  await init();
});

describe('GET /api/producers', () => {
  test('should return a list of producers awards', async () => {
      const response = await request(app).get('/api/producers');
      const expectedResponse = {
        "min": [
          {
            "producer": "Joel Silver",
            "interval": 1,
            "previousWin": 1990,
            "followingWin": 1991
          },
          {
            "producer": "Bo Derek",
            "interval": 6,
            "previousWin": 1984,
            "followingWin": 1990
          }
        ],
        "max": [
          {
            "producer": "Matthew Vaughn",
            "interval": 13,
            "previousWin": 2002,
            "followingWin": 2015
          },
          {
            "producer": "Buzz Feitshans",
            "interval": 9,
            "previousWin": 1985,
            "followingWin": 1994
          }
        ]
      };
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
  });
});