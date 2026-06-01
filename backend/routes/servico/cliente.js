const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas os clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// POST criar um cliente
router.post('/', async (req, res) => {
  const { documento, nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (documento,nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [documento, nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele ]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});


module.exports = router;