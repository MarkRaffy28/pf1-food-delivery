// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mock Database
let foods = [
  { id: 1, name: "Samgyeopsal (삼겹살)", price: 350 },
  { id: 2, name: "Kimchi jjigae (김치 찌개)", price: 100 },
  { id: 3, name: "Tteokbokki (떡볶이)", price: 120 },
  { id: 4, name: "Bibimbap (비빔밥)", price: 140 },
  { id: 5, name: "Gimbap (김밥)", price: 40 },
  { id: 6, name: "Samgyetang (삼계탕)", price: 350 },
  { id: 7, name: "Sundae (순대)", price: 80 },
  { id: 8, name: "Bossam (보쌈)", price: 230 },
  { id: 9, name: "Bulgogi (불고기)", price: 170 },
  { id: 10, name: "Seolleongtang (설렁탕)", price: 140 }
];

let orders = [];

// ✅ GET all foods (200 OK)
app.get('/api/foods', (req, res) => {
  res.status(200).json(foods);
});

// ✅ GET single food (200 or 404)
app.get('/api/foods/:id', (req, res) => {
  const food = foods.find(f => f.id == req.params.id);
  if (!food) return res.status(404).json({ error: "Food not found" });
  res.status(200).json(food);
});

// ✅ POST create new order (201 or 400)
app.post('/api/orders', (req, res) => {
  const { food_id, quantity, customer_name } = req.body;
  if (!food_id || !quantity || !customer_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newOrder = {
    id: orders.length + 1,
    food_id,
    quantity,
    customer_name
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully!", order: newOrder });
});

// 🚫 DELETE food (403 Forbidden)
app.delete('/api/foods/:id', (req, res) => {
  const isAdmin = false; // simulate a non-admin user
  if (!isAdmin) return res.status(403).json({ error: "Only admins can delete food" });

  const index = foods.findIndex(f => f.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Food not found" });

  foods.splice(index, 1);
  res.status(200).json({ message: "Food deleted" });
});

// 💥 Simulate server error (500)
app.get('/api/error', (req, res) => {
  res.status(500).json({ error: "Internal server error" });
});

// ⚙️ Not implemented (501)
app.patch('/api/orders/:id', (req, res) => {
  res.status(501).json({ error: "PATCH not implemented" });
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
