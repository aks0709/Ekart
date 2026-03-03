import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import Toast from '../components/Toast';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: '', price: '', description: '', brand: '', category: '', stock: '', productAvailable: true, releaseDate: ''
  });

  useEffect(() => {
    productAPI.getById(id).then(product => {
      setForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        brand: product.brand || '',
        category: product.category || '',
        stock: product.stock || '',
        productAvailable: product.productAvailable ?? true,
        releaseDate: product.releaseDate || ''
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.price < 0 || form.stock < 0) {
      setToast({ message: 'Price and stock must be >= 0', type: 'error' });
      return;
    }

    try {
      await productAPI.update(id, form);
      setToast({ message: 'Product updated!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ message: 'Failed to update product', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
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
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
