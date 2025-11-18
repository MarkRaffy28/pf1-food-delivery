import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';

const App = () => {
  const [foods] = useState([
    { id: 1, image: "https://dl.dropbox.com/scl/fi/twupbgxh1rde14s5b3het/samgyeopsal.webp?rlkey=bcowx4yjli9i3nh7uaz72t9tg&st=2u27nmh3&dl=0", name: "Samgyeopsal", kor: "(삼겹살)", price: 350 },
    { id: 2, image: "https://dl.dropbox.com/scl/fi/c0va00xuszykhd41yvoe5/kimchi-jjigae.webp?rlkey=w202mqzhkxaue7avr5iq3e90j&st=oirfkoml&dl=0", name: "Kimchi jjigae", kor: "(김치 찌개)", price: 100 },
    { id: 3, image: "https://DL.dropbox.com/scl/fi/wvwtxlv4tgt1qlc1c1t1z/tteokbokki.jpg?rlkey=yzywfwyysuj4p4ubjmvy3i5o5&st=av7rg1p6&dl=0", name: "Tteokbokki", kor: "(떡볶이)", price: 120 },
    { id: 4, image: "https://dl.dropbox.com/scl/fi/weuf6x8vafmgz1oxexglm/bibimbap.webp?rlkey=fyd3ew7mxebq7uq8jeg76t3va&st=z4k87hpy&dl=0", name: "Bibimbap", kor: "(비빔밥)", price: 140 },
    { id: 5, image: "https://dl.dropbox.com/scl/fi/2g0mtg36qsonrzkt72sus/gimbap.webp?rlkey=1gkfhuliv0luo3fda6jmb5hlp&st=2lbptdyg&dl=0", name: "Gimbap", kor: "(김밥)", price: 40 },
    { id: 6, image: "https://dl.dropbox.com/scl/fi/j29j7044yr90do0y8v0vd/samyetang.jpg?rlkey=jun84juaijw1dvj3mz1t8iqpa&st=pu4rksso&dl=0", name: "Samgyetang", kor: "(삼계탕)", price: 350 },
    { id: 7, image: "https://dl.dropbox.com/scl/fi/5c4e2gg3a77teecqys8zd/sundae.jpg?rlkey=x0wz4pfjgk1rx87eyo7zm7k22&st=06r511d2&dl=0", name: "Sundae", kor: "(순대)", price: 80 },
    { id: 8, image: "https://dl.dropbox.com/scl/fi/r6c4vuu46190aqb2cjr1i/bossam.jpg?rlkey=qfavp8zrwcn3qh6dr4lz9l0f4&st=wmailh9l&dl=0", name: "Bossam", kor: "(보쌈)", price: 230 },
    { id: 9, image: "https://dl.dropbox.com/scl/fi/4wk0v1m2tob5trtl96wdi/bulgogi.webp?rlkey=9r3vquii0ewa84xz8y7d7kxto&st=chr58ay7&dl=0", name: "Bulgogi", kor: "(불고기)", price: 170 },
    { id: 10, image: "https://dl.dropbox.com/scl/fi/7rv3fi7b500rr8sobep4p/seolleongtang.jpg?rlkey=skb3i7wsrlleod5bis2n3115o&st=tz3nnrto&dl=0", name: "Seolleongtang", kor: "(설렁탕)", price: 140 },
  ]);
  
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Initialize quantities when app starts
  useEffect(() => {
    const initialQuantities = {};
    foods.forEach(food => (initialQuantities[food.id] = 1));
    setQuantities(initialQuantities);
  }, [foods]);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  // Adjust quantity per food
  const updateQuantity = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };
  
  // Add item to cart
  const addToCart = (food) => {
    const qty = quantities[food.id] || 1;
    const existing = cart.find(item => item.id === food.id);
    
    if (existing) {
      setCart(cart.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setCart([...cart, { ...food, quantity: qty }]);
    }
  
    setMessage(`${food.name} added to cart!`);
  };

  // Update cart item quantity
  const updateCartQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    setMessage('Item removed from cart');
  };
  
  // Place all "orders" (mock) 
  const placeAllOrders = () => {
    if (cart.length === 0) {
      setMessage('❌ Your cart is empty!');
      return;
    }
    
    // Simulate async success
    setTimeout(() => {
      setCart([]);
      setMessage('✅ All orders placed successfully!');
      setIsCartOpen(false);
    }, 500);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png" alt="" className="inline w-10 h-6"/>
              <h1 className="inline text-2xl sm:text-3xl font-bold text-red-600">Seoul Kitchen</h1>
              <p className="text-md self-end font-bold text-red-600">서울 킽첸</p>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Authentic Korean Cuisine</p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-red-600 text-white p-3 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Success Message Toast */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl">
            {message}
          </div>
        </div>
      )}

      {/* Food Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map(food => (
            <div 
              key={food.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform"
            >
              <div className="relative overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 inline">{food.name}</h3>
                <p className="text-xs font-semibold text-gray-800 line-clamp-1 inline"> {food.kor}</p>
                <p className="text-2xl font-bold text-red-600 mb-4">₱{food.price}</p>
                
                <div className="flex items-center justify-between mb-4">
                  {(quantities[food.id] > 1) && (
                    <span className="text-xl font-bold text-green-800 transition-all duration-300 opacity-100 scale-110">₱{food.price * quantities[food.id]}</span>
                  )}
                  <button
                    onClick={() => updateQuantity(food.id, -1)}
                    className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-semibold">{quantities[food.id] || 1}</span>
                  <button
                    onClick={() => updateQuantity(food.id, 1)}
                    className="bg-gray-200 p-2 rounded-full hover:bg-green-800 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  onClick={() => addToCart(food)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-200 font-semibold transform hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Overlay */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`fixed right-0 top-0 h-full w-full lg:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-red-800 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingCart size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-2">Add some delicious Korean food!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors duration-200 hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate inline">{item.name}</h3>
                      <p className="text-[10px] font-semibold text-gray-800 line-clamp-1 truncate inline">  {item.kor}</p>
                      <p className="text-red-600 font-bold">₱{item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="bg-white p-1.5 rounded hover:bg-red-500 hover:text-white transition-all duration-200 shadow hover:shadow-md active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="bg-white p-1.5 rounded hover:bg-green-800 hover:text-white transition-all duration-200 shadow hover:shadow-md active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Subtotal: ₱{item.price * item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 sm:p-6 bg-gray-50 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-3xl font-bold text-red-600">₱{getTotalPrice()}</span>
              </div>
              <button 
                onClick={placeAllOrders}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;