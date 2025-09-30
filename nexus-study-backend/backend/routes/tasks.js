const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function authMiddleware(req, res, next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({ error: 'no_token' });
  const token = h.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

// criar tarefa
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, goal_minutes } = req.body;
  const q = await req.pool.query(
    'INSERT INTO tasks (user_id, title, description, goal_minutes) VALUES ($1,$2,$3,$4) RETURNING *',
    [req.userId, title, description || null, goal_minutes || 0]
  );
  res.json(q.rows[0]);
});

// listar tarefas do usuário
router.get('/', authMiddleware, async (req, res) => {
  const q = await req.pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
  res.json(q.rows);
});

// salvar sessão (quando usuário encerra)
// body: { task_id, started_at, ended_at, focused_minutes, points_awarded, completed }
router.post('/sessions', authMiddleware, async (req, res) => {
  const { task_id, started_at, ended_at, focused_minutes, points_awarded, completed } = req.body;
  const q = await req.pool.query(
    `INSERT INTO sessions (user_id, task_id, start_time, end_time, focused_minutes, points_awarded, completed)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [req.userId, task_id, started_at || new Date(), ended_at || new Date(), focused_minutes || 0, points_awarded || 0, completed || false]
  );

  // atualiza total_points no usuário
  if(points_awarded && points_awarded > 0){
    await req.pool.query('UPDATE users SET total_points = total_points + $1 WHERE id = $2', [points_awarded, req.userId]);
  }

  res.json(q.rows[0]);
});

// histórico
router.get('/sessions', authMiddleware, async (req, res) => {
  const q = await req.pool.query('SELECT * FROM sessions WHERE user_id = $1 ORDER BY start_time DESC LIMIT 200', [req.userId]);
  res.json(q.rows);
});

module.exports = router;
