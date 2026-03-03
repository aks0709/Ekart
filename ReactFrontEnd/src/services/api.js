import { getToken } from '../utils/auth';

const API_BASE = 'http://localhost:8080';

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export const authAPI = {
  login: (email, password) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),
  
  register: (name, email, password, role) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    }).then(r => r.json())
};

export const productAPI = {
  getAll: () =>
    fetch(`${API_BASE}/api/products`, { headers: authHeaders() }).then(r => r.json()),
  
  getById: (id) =>
    fetch(`${API_BASE}/api/products/${id}`, { headers: authHeaders() }).then(r => r.json()),
  
  search: (keyword) =>
    fetch(`${API_BASE}/api/products/search?keyword=${keyword}`, { headers: authHeaders() }).then(r => r.json()),
  
  create: (formData) =>
    fetch(`${API_BASE}/api/products/upload`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData
    }).then(r => r.json()),
  
  update: (id, product) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(r => r.json()),
  
  delete: (id) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    }),
  
  getImageUrl: (id) => `${API_BASE}/api/products/${id}/image`
};
