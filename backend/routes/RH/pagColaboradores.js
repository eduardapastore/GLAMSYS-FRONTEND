const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

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