import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, clearAuth } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  if (!isAuthenticated()) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Ekart</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/cart" className="hover:text-blue-200">Cart</Link>
          {isAdmin() && <Link to="/add-product" className="hover:text-blue-200">Add Product</Link>}
          <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
    </nav>
  );
}
