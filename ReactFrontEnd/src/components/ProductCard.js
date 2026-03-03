import { Link } from 'react-router-dom';
import { isAdmin } from '../utils/auth';
import { productAPI } from '../services/api';

export default function ProductCard({ product, onDelete, onAddToCart }) {
  const handleDelete = async () => {
    if (window.confirm('Delete this product?')) {
      await productAPI.delete(product.id);
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <Link to={`/product/${product.id}`}>
        <img 
          src={productAPI.getImageUrl(product.id)} 
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-blue-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        <p className="text-xl font-bold text-green-600 mb-2">₹{product.price}</p>
        <p className="text-sm text-gray-500 mb-3">Stock: {product.stock}</p>
        
        {isAdmin() ? (
          <div className="flex gap-2">
            <Link to={`/edit-product/${product.id}`} className="flex-1 bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-600">
              Update
            </Link>
            <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onAddToCart(product)} 
            disabled={product.stock === 0}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        )}
      </div>
    </div>
  );
}
