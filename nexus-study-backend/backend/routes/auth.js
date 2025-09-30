const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'missing' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await req.pool.query(
      'INSERT INTO users (name, email, password_hash, total_points) VALUES ($1,$2,$3,0) RETURNING id, name, email',
      [name || null, email, hashed]
    );
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const q = await req.pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
  if(q.rowCount === 0) return res.status(401).json({ error: 'invalid_credentials' });
  const user = q.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if(!match) return res.status(401).json({ error: 'invalid_credentials' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

module.exports = router;
