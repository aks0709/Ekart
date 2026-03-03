import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../hooks/useCart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('');
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getAll().then(setProducts);
  }, []);

  useEffect(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (category) result = result.filter(p => p.category === category);
    if (brand) result = result.filter(p => p.brand === brand);
    
    if (sort === 'low') result.sort((a, b) => a.price - b.price);
    if (sort === 'high') result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [products, search, category, brand, sort]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToast({ message: 'Added to cart!', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border rounded">
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border rounded">
              <option value="">Sort by Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
