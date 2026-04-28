const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos servicos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT id, descricao, categoria
    FROM servico
    ORDER BY categoria, descricao
  `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar servico' });
  }
});


module.exports = router;