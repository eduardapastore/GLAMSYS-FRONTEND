const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas ordens
router.get('/', async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT
        o.id,
        o.status,
        o.descricao,

        c.nome_razao AS cliente_nome,
        c.telefone AS cliente_telefone,

        col.nome AS colaborador_nome,

        s.descricao AS procedimento,
        s.valor,

        a.data AS data_agendamento,
        a.hora AS hora_agendamento

      FROM ordens_servico o

      INNER JOIN clientes c
        ON c.id = o.cliente_id

      LEFT JOIN colaboradores col
        ON col.id = o.colaborador_id

      INNER JOIN servico s
        ON s.id = o.servico_id

      LEFT JOIN agendamentos a
        ON a.ordem_servico_id = o.id

      ORDER BY a.data DESC, a.hora DESC
    `);

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar OSs'
    });

  }
});

module.exports = router;