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
  const { documento, nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele, cordofio } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (documento, nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele, cordofio ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)',
      [documento, nome_razao, email, telefone, pontos_fidelidade, data_nascimento, curvatura_cabelo, tipo_pele, cordofio]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

router.get('/quantidade', async (req, res) => {

  try {

    const [rows] = await pool.query(`
      SELECT COUNT(*) AS total 
      FROM clientes
    `);

    res.json({
      total: rows[0].total
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: 'Erro ao buscar quantidade'
    });

  }

});

router.get('/novos-mes', async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT COUNT(*) AS total
      FROM clientes
      WHERE MONTH(criado_at) = MONTH(CURRENT_DATE())
      AND YEAR(criado_at) = YEAR(CURRENT_DATE())
    `);

    res.json({
      total: rows[0].total
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar clientes novos do mês'
    });

  }
});

router.get('/aniversariantes-hoje', async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT COUNT(*) AS total
      FROM clientes
      WHERE DAY(data_nascimento) = DAY(CURDATE())
      AND MONTH(data_nascimento) = MONTH(CURDATE())
    `);

    res.json({
      total: rows[0].total
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar aniversariantes'
    });

  }
});

router.get('/servico-mais-contratado', async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT
        s.id,
        s.descricao,
        COUNT(a.id) AS total_contratacoes
      FROM agendamentos a
      INNER JOIN servico s ON s.id = a.servico_id
      GROUP BY s.id, s.descricao
      ORDER BY total_contratacoes DESC
      LIMIT 1
    `);

    if (rows.length === 0) {
      return res.json({
        descricao: 'Nenhum serviço encontrado',
        total: 0
      });
    }

    res.json({
      descricao: rows[0].descricao,
      total: rows[0].total_contratacoes
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar serviço mais contratado'
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    nome_razao,
    email,
    data_nascimento,
    telefone,
    curvatura_cabelo,
    cordofio,
    tipo_pele
  } = req.body;

  try {
    await pool.query(
      "UPDATE clientes SET nome_razao = ?, email = ?, data_nascimento = ?, telefone = ?, curvatura_cabelo = ?, cordofio = ?, tipo_pele = ? WHERE id = ?",
      [nome_razao,
        email,
        data_nascimento,
        telefone,
        curvatura_cabelo,
        cordofio,
        tipo_pele,
        id]
    );

    res.json({ message: "Cliente atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






module.exports = router;