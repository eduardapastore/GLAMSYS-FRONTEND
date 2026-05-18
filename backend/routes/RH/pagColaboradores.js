const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pagamento_colaborador');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar folha de pagamento' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM pagamento_colaborador WHERE colaborador_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pagamento não encontrado para o colaborador especificado.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar pagamento do colaborador:', err);
    res.status(500).json({ error: 'Erro ao buscar pagamento do colaborador.' });
  }
});
//criar 

router.post('/', async (req, res) => {
  try {
    let {
        salario_fixo,
        tipo_chave_pix,
        chave_pix,
        porcentagem_comissao,
        agencia,
        numero_conta,
        vale_alimentacao,
        vale_transporte,
        colaborador_id
    } = req.body;


    await pool.query(
      `INSERT INTO pagamento_colaborador 
       (salario_fixo, tipo_chave_pix, chave_pix, porcentagem_comissao, agencia, numero_conta, vale_alimentacao, vale_transporte, colaborador_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [salario_fixo, tipo_chave_pix, chave_pix, porcentagem_comissao, agencia, numero_conta, vale_alimentacao, vale_transporte, colaborador_id]
    );

    res.json({ success: true, message: 'Colaborador inserido com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir colaborador:', error);
    res.status(500).json({ error: 'Erro ao inserir colaborador.' });
  }
});




module.exports = router;