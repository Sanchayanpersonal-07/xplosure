import api from './api';

export const userService = {
  uploadResume: async (formData) => {
    const response = await api.post('/users/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await api.put('/users/profile', updates);
    return response.data;
  },

  // ✅ NEW: Change password (requires current password)
  changePassword: async ({ currentPassword, newPassword }) => {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
