const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

// GET todos colaboradores
router.get('/', async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT 
        id,
        nome,
        cpf,
        email,
        telefone,
        cargo,
        data_admissao,
        status,
        vinculo,
        local_trabalho
      FROM colaboradores
    `);

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar colaboradores'
    });

  }
});


// CRIAR COLABORADOR
router.post('/', upload.single('foto'), async (req, res) => {

  try {

    let {
      nome,
      cpf,
      email,
      telefone,
      cargo,
      data_admissao,
      status,
      vinculo,
      local_trabalho
    } = req.body;

    // limpa cpf
    cpf = cpf.replace(/[.\-]/g, '');

    // foto em blob
    const foto = req.file ? req.file.buffer : null;

    console.log('CPF limpo:', cpf);

    const [result] = await pool.query(
      `
      INSERT INTO colaboradores
      (
        nome,
        cpf,
        email,
        telefone,
        cargo,
        data_admissao,
        status,
        vinculo,
        local_trabalho,
        foto
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nome,
        cpf,
        email,
        telefone,
        cargo,
        data_admissao,
        status || 'ATIVO',
        vinculo,
        local_trabalho,
        foto
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Colaborador inserido com sucesso!',
      id: result.insertId
    });

  } catch (error) {

    console.error('Erro ao inserir colaborador:', error);

    res.status(500).json({
      error: 'Erro ao inserir colaborador.'
    });

  }

});


// QUANTIDADE
router.get('/quantidade', async (req, res) => {

  try {

    const [rows] = await pool.query(`
      SELECT COUNT(*) AS total 
      FROM colaboradores
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

router.get('/foto/:id', async (req, res) => {

  const { id } = req.params;

  const [rows] = await pool.query(
    'SELECT foto FROM colaboradores WHERE id = ?',
    [id]
  );

  if (!rows.length || !rows[0].foto) {
    return res.status(404).send('Imagem não encontrada');
  }

  res.setHeader('Content-Type', 'image/jpeg');

  res.send(rows[0].foto);

});

module.exports = router;