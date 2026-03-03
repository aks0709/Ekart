import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import Toast from '../components/Toast';

export default function AddProduct() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: '', price: '', description: '', brand: '', category: '', stock: '', productAvailable: true, releaseDate: ''
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.price < 0 || form.stock < 0) {
      setToast({ message: 'Price and stock must be >= 0', type: 'error' });
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (image) formData.append('image', image);

    try {
      await productAPI.create(formData);
      setToast({ message: 'Product added!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ message: 'Failed to add product', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add Product</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-3 border rounded mb-4" required />
            <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-3 border rounded mb-4" required />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-3 border rounded mb-4" rows="3" />
            <input type="text" placeholder="Brand" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full p-3 border rounded mb-4" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full p-3 border rounded mb-4">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>
            <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className="w-full p-3 border rounded mb-4" />
            <input type="date" value={form.releaseDate} onChange={(e) => setForm({...form, releaseDate: e.target.value})} className="w-full p-3 border rounded mb-4" />
            <label className="flex items-center mb-4">
              <input type="checkbox" checked={form.productAvailable} onChange={(e) => setForm({...form, productAvailable: e.target.checked})} className="mr-2" />
              Available
            </label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-3 border rounded mb-4" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
