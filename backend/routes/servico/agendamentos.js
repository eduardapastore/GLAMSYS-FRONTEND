const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.post('/', async (req, res) => {
  const { cliente_id, observacoes, servico_id, colaboradores_id, data, hora } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO agendamentos (cliente_id, observacoes, servico_id, colaboradores_id, data, hora)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [cliente_id, observacoes, servico_id, colaboradores_id, data, hora]);
    res.json({ message: 'Agendamento criado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agendamentos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

router.get('/detalhes', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        DATE_FORMAT(a.data, '%Y-%m-%d') AS data,
        a.hora,
        a.observacoes,
        c.nome_razao AS cliente_nome,
        c.telefone,
        col.nome AS colaborador_nome,
        s.descricao AS servico_nome
      FROM agendamentos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN colaboradores col ON a.colaboradores_id = col.id
      LEFT JOIN servico s ON a.servico_id = s.id
      ORDER BY a.data, a.hora
    `);

    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos detalhados' });
  }
});

router.get('/detalhes2', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        a.data,
        a.hora,
        c.nome_razao AS cliente_nome,
        c.telefone,
        s.descricao AS servico_nome
      FROM agendamentos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN colaboradores col ON a.colaboradores_id = col.id
      LEFT JOIN servico s ON a.servico_id = s.id
      ORDER BY a.data, a.hora
    `);
    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos detalhados' });
  }
});

router.get('/cliente/:id/resumo', async (req, res) => {
  const { id } = req.params;

  try {

    // PRÓXIMO AGENDAMENTO
    const [proximo] = await pool.query(`
      SELECT 
        DATE_FORMAT(a.data, '%d/%m/%Y') AS data,
        a.hora,
        s.descricao AS servico
      FROM agendamentos a
      LEFT JOIN servico s ON a.servico_id = s.id
      WHERE a.cliente_id = ?
      AND CONCAT(a.data, ' ', a.hora) >= NOW()
      ORDER BY a.data ASC, a.hora ASC
      LIMIT 1
    `, [id]);

    // ÚLTIMO SERVIÇO
    const [ultimo] = await pool.query(`
      SELECT 
        DATE_FORMAT(a.data, '%d/%m/%Y') AS data,
        a.hora,
        s.descricao AS servico
      FROM agendamentos a
      LEFT JOIN servico s ON a.servico_id = s.id
      WHERE a.cliente_id = ?
      AND CONCAT(a.data, ' ', a.hora) < NOW()
      ORDER BY a.data DESC, a.hora DESC
      LIMIT 1
    `, [id]);

    // TICKET MÉDIO
    const [ticket] = await pool.query(`
      SELECT
        COUNT(
          CASE
            WHEN os.status = 'FECHADA'
            THEN os.id
          END
        ) AS total_atendimentos,

        COALESCE(
          SUM(
            CASE
              WHEN os.status = 'FECHADA'
              THEN s.valor
              ELSE 0
            END
          ),
          0
        ) AS valor_total_gasto,

        COALESCE(
          ROUND(
            AVG(
              CASE
                WHEN os.status = 'FECHADA'
                THEN s.valor
                ELSE NULL
              END
            ),
            2
          ),
          0
        ) AS ticket_medio

      FROM clientes c

      LEFT JOIN ordens_servico os
        ON c.id = os.cliente_id

      LEFT JOIN servico s
        ON os.servico_id = s.id

      WHERE c.id = ?

      GROUP BY c.id
    `, [id]);

    res.json({
      proximoAgendamento: proximo[0] || null,
      ultimoServico: ultimo[0] || null,

      total_atendimentos: ticket[0]?.total_atendimentos || 0,
      valor_total_gasto: ticket[0]?.valor_total_gasto || 0,
      ticket_medio: ticket[0]?.ticket_medio || 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Erro ao buscar resumo do cliente'
    });
  }
});



module.exports = router;

