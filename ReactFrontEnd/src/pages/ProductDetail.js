import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { isAdmin } from '../utils/auth';
import { useCart } from '../hooks/useCart';
import Toast from '../components/Toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getById(id).then(setProduct);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this product?')) {
      await productAPI.delete(id);
      navigate('/');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setToast({ message: 'Added to cart!', type: 'success' });
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={productAPI.getImageUrl(product.id)}
              alt={product.name}
              className="w-full rounded-lg"
              onError={(e) => e.target.src = 'https://via.placeholder.com/500?text=No+Image'}
            />
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-3xl font-bold text-green-600 mb-4">₹{product.price}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg mb-6">Stock: {product.stock}</p>

              {isAdmin() ? (
                <div className="flex gap-4">
                  <Link to={`/edit-product/${product.id}`} className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600">
                    Update Product
                  </Link>
                  <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
                    Delete Product
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
