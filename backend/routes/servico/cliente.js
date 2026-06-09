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