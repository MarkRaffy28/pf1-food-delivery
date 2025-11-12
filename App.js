import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // Local mock data instead of backend fetch
  const [foods] = useState([
    { id: 1, image: "https://dl.dropbox.com/scl/fi/twupbgxh1rde14s5b3het/samgyeopsal.webp?rlkey=bcowx4yjli9i3nh7uaz72t9tg&st=2u27nmh3&dl=0", name: "Samgyeopsal (삼겹살)", price: 350 },
    { id: 2, image: "https://dl.dropbox.com/scl/fi/c0va00xuszykhd41yvoe5/kimchi-jjigae.webp?rlkey=w202mqzhkxaue7avr5iq3e90j&st=oirfkoml&dl=0", name: "Kimchi jjigae (김치 찌개)", price: 100 },
    { id: 3, image: "https://DL.dropbox.com/scl/fi/wvwtxlv4tgt1qlc1c1t1z/tteokbokki.jpg?rlkey=yzywfwyysuj4p4ubjmvy3i5o5&st=av7rg1p6&dl=0", name: "Tteokbokki (떡볶이)", price: 120 },
    { id: 4, image: "https://dl.dropbox.com/scl/fi/weuf6x8vafmgz1oxexglm/bibimbap.webp?rlkey=fyd3ew7mxebq7uq8jeg76t3va&st=z4k87hpy&dl=0", name: "Bibimbap (비빔밥)", price: 140 },
    { id: 5, image: "https://dl.dropbox.com/scl/fi/2g0mtg36qsonrzkt72sus/gimbap.webp?rlkey=1gkfhuliv0luo3fda6jmb5hlp&st=2lbptdyg&dl=0", name: "Gimbap (김밥)", price: 40 },
    { id: 6, image: "https://dl.dropbox.com/scl/fi/j29j7044yr90do0y8v0vd/samyetang.jpg?rlkey=jun84juaijw1dvj3mz1t8iqpa&st=pu4rksso&dl=0", name: "Samgyetang (삼계탕)", price: 350 },
    { id: 7, image: "https://dl.dropbox.com/scl/fi/5c4e2gg3a77teecqys8zd/sundae.jpg?rlkey=x0wz4pfjgk1rx87eyo7zm7k22&st=06r511d2&dl=0", name: "Sundae (순대)", price: 80 },
    { id: 8, image: "https://dl.dropbox.com/scl/fi/r6c4vuu46190aqb2cjr1i/bossam.jpg?rlkey=qfavp8zrwcn3qh6dr4lz9l0f4&st=wmailh9l&dl=0", name: "Bossam (보쌈)", price: 230 },
    { id: 9, image: "https://dl.dropbox.com/scl/fi/4wk0v1m2tob5trtl96wdi/bulgogi.webp?rlkey=9r3vquii0ewa84xz8y7d7kxto&st=chr58ay7&dl=0", name: "Bulgogi (불고기)", price: 170 },
    { id: 10, image: "https://dl.dropbox.com/scl/fi/7rv3fi7b500rr8sobep4p/seolleongtang.jpg?rlkey=skb3i7wsrlleod5bis2n3115o&st=tz3nnrto&dl=0", name: "Seolleongtang (설렁탕)", price: 140 },
  ]);
  
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  
  // Initialize quantities when app starts
  React.useEffect(() => {
    const initialQuantities = {};
    foods.forEach(food => (initialQuantities[food.id] = 1));
    setQuantities(initialQuantities);
  }, [foods]);
  
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
    }, 500);
  };
  
  const styles = {
    price: {
      fontSize: 14
    },
    btnOperation: {
      fontSize: 10,
      padding: 5
    },
    btnCart: {
      fontSize: 14
    }
  }
  
  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">🍔 Food Delivery System</h2>
      {message && (
        <div className="alert alert-info text-center fw-bold alert-dismissible fade show" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}
      
      {/* Food List */}
      <div className="row">
        <div className="col-12 col-lg-8 row g-3 lists">
          {foods.map(food => (
            <div key={food.id} className="list col-6 col-md-4 col-lg-4">
              <div className="card h-100 shadow-sm border border-dark rounded">
                <div className="card-body p-2 text-center d-flex flex-column justify-content-between">
                  <div>
                    <img className='image' src={food.image} alt={food.name}></img>
                    <h6 className="card-title fw-bold lh-base"> 
                      {food.name} 
                    </h6>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <p style={styles.price} className="card-text text-muted m-0 p-0">₱{food.price} ×</p>
                    <button
                      style={styles.btnOperation}
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={() => updateQuantity(food.id, -1)}
                    >
                      −
                    </button>
                    <span className='fw-bold'>{quantities[food.id] || 1}</span>
                    <button
                      style={styles.btnOperation}
                      className="btn btn-success btn-sm fw-bold"
                      onClick={() => updateQuantity(food.id, +1)}
                    >
                      +
                    </button>
                  </div>
                  <div className='mt-2'>
                    <button
                      style={styles.btnCart}
                      className="btn btn-primary py-1 w-100 fw-semibold"
                      onClick={() => addToCart(food)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Section */}
        <div className='col-12 col-lg-4'>
          <hr className="my-5 d-block d-lg-none" />
          <h2 className="text-center mb-4 fw-bold">🛒 Your Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-center text-muted">No items in cart yet.</p>
          ) : (
            <ul className="list-group mb-4">
              {cart.map(item => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.name}</strong> × {item.quantity}
                  </div>
                  <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                    ₱{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
          {cart.length > 0 && (
            <div className="text-center">
              <button className="mt-4 btn btn-success btn-lg fw-bold" onClick={placeAllOrders}>
                Place All Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
