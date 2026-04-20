import api from './api';

export const pricingService = {
  getPlans: async () => {
    const response = await api.get('/pricing');
    return response.data;
  },
  
  // Admin only methods
  getAllPlans: async () => {
    const response = await api.get('/pricing/admin');
    return response.data;
  },
  
  createPlan: async (planData) => {
    const response = await api.post('/pricing', planData);
    return response.data;
  },
  
  updatePlan: async (id, planData) => {
    const response = await api.put(`/pricing/${id}`, planData);
    return response.data;
  },
  
  deletePlan: async (id) => {
    const response = await api.delete(`/pricing/${id}`);
    return response.data;
  }
};