import { useCart } from '../hooks/useCart';
import { getCartTotal } from '../utils/cart';
import { productAPI } from '../services/api';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handlePlaceOrder = () => {
    alert(`Order placed successfully! Total: ₹${getCartTotal().toFixed(2)}`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <a href="/" className="text-blue-600 hover:underline">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b py-4">
              <img
                src={productAPI.getImageUrl(item.id)}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
                onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:bg-gray-200"
                >
                  +
                </button>
              </div>
              <p className="font-bold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <button onClick={clearCart} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
              Clear Cart
            </button>
            <div className="text-right">
              <p className="text-2xl font-bold mb-4">Total: ₹{getCartTotal().toFixed(2)}</p>
              <button onClick={handlePlaceOrder} className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
