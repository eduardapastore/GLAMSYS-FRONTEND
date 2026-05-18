const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos servicos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT id, descricao, categoria, valor, duracao
    FROM servico
    ORDER BY categoria, descricao
  `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar servico' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { descricao, categoria, valor, duracao } = req.body;

    if (!descricao || !categoria || !valor || !duracao) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const [result] = await pool.query(
      `INSERT INTO servico (descricao, categoria, valor, duracao)
       VALUES (?, ?, ?, ?)`,
      [descricao, categoria, valor, duracao]
    );

    res.status(201).json({
      success: true,
      message: 'Serviço adicionado com sucesso!',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Erro ao adicionar serviço:', err);
    res.status(500).json({ error: 'Erro ao adicionar serviço.' });
  }
});


module.exports = router;