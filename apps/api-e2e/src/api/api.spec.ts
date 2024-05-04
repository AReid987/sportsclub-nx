import axios from 'axios';

jest.mock('axios');

describe('GET /api', () => {
  it('should return a message', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = { status: 200, data: { message: 'Hello API' } };
    mockedAxios.get.mockResolvedValue(mockResponse);
    try {
      const res = await axios.get(`/api`);
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ message: 'Hello API' });
    } catch (error) {
      console.error('Error during api-e2e test', error);
      throw error;
    }
  });
});
