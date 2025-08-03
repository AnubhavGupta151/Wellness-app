import api from './api';

export const sessionService = {
  // Get all published sessions
  getSessions: async (params = {}) => {
    const response = await api.get('/api/sessions', { params });
    return response.data;
  },

  // Get user's sessions
  getMySessions: async (status = '') => {
    const params = status ? { status } : {};
    const response = await api.get('/api/sessions/my-sessions', { params });
    return response.data;
  },

  // Get single session
  getSession: async (id) => {
    const response = await api.get(`/api/sessions/my-sessions/${id}`);
    return response.data;
  },

  // Save draft
  saveDraft: async (sessionData) => {
    const response = await api.post('/api/sessions/my-sessions/save-draft', sessionData);
    return response.data;
  },

  // Publish session
  publishSession: async (sessionData) => {
    const response = await api.post('/api/sessions/my-sessions/publish', sessionData);
    return response.data;
  },

  // Delete session
  deleteSession: async (id) => {
    const response = await api.delete(`/api/sessions/my-sessions/${id}`);
    return response.data;
  }
};