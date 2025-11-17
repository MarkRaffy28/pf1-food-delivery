import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [orderMessage, setOrderMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch foods from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/foods')
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setFoods(data);
        const initialQuantities = {};
        data.forEach(food => (initialQuantities[food.id] = 1));
        setQuantities(initialQuantities);
      })
      .catch(err => setError(err.message));
  }, []);

  // Change quantity per food
  const updateQuantity = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  // Add to Cart
  const addToCart = (food) => {
    const quantity = quantities[food.id] || 1;
    const existing = cart.find(item => item.id === food.id);

    if (existing) {
      // If already in cart, update quantity
      setCart(cart.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { ...food, quantity }]);
    }

    setOrderMessage(`${food.name} added to cart!`);
    setError('');
  };

  // Place all orders in cart
  const placeAllOrders = () => {
    if (cart.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    Promise.all(
      cart.map(item =>
        fetch('http://localhost:4000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            food_id: item.id,
            quantity: item.quantity,
            customer_name: 'Donn'
          })
        })
      )
    )
      .then(() => {
        setOrderMessage('All orders placed successfully!');
        setCart([]); // clear cart
      })
      .catch(() => setError('Network error'));
  };

  return (
    <div className="container my-5">
      <h1 className="fw-bold text-center mb-4 ">🍔 Food Delivery System</h1>

      {/* Alerts */}
      {error && (
        <div className="alert alert-danger text-center fw-bold alert-dismissible fade show" role="alert">
          ❌ {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      {orderMessage && (
        <div className="alert alert-success text-center fw-bold alert-dismissible fade show" role="alert">
          ✅ {orderMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}


      {/* Food List */}
      <div className="row g-4">
        {foods.map(food => (
          <div key={food.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border border-dark border-2 rounded">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold lh-base">{food.name}</h5>
                  <p className="card-text text-muted mb-3">₱{food.price}</p>
                </div>

                <div className="d-flex align-items-center justify-content-center mb-3">
                  <button
                    className="btn btn-danger btn-sm fw-bold"
                    onClick={() => updateQuantity(food.id, -1)}
                  >
                    −
                  </button>
                  <span className="mx-3">{quantities[food.id] || 1}</span>
                  <button
                    className="btn btn-success btn-sm fw-bold"
                    onClick={() => updateQuantity(food.id, +1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(food)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}n
      </div>

      <hr className="my-5" />

      {/* Cart Section */}
      <div>
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
  );

}

export default App;