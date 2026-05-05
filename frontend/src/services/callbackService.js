import { apiClient } from './apiClient.js';

/**
 * Submits a "Request a Callback" form to the backend.
 * @param {{ name: string, phone: string, message?: string }} payload
 */
export const callbackService = {
  submit(payload) {
    return apiClient.post('/callback', payload);
  },
};
