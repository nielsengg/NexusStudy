require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

const PORT = process.env.PORT || 3000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// disponibiliza pool para rotas via req.pool
app.use((req, res, next) => { req.pool = pool; next(); });

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Nexus Study API' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
