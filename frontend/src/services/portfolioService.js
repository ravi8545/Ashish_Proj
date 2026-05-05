import { projects as dummyProjects } from '../data/portfolioData.js';
// import { apiClient } from './apiClient.js';

/**
 * Portfolio service.
 * Currently returns dummy data so the UI runs standalone.
 * Swap to apiClient.get('/portfolio') when backend data is ready.
 */
export const portfolioService = {
  async getAll() {
    // return apiClient.get('/portfolio').then((res) => res.data);
    return Promise.resolve(dummyProjects);
  },

  async getByCategory(category) {
    const all = await portfolioService.getAll();
    if (!category || category === 'All') return all;
    return all.filter((p) => p.category === category);
  },
};
