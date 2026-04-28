const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

//criar 

router.post('/', async (req, res) => {
    const servicos = req.body; // Recebe um array de objetos [{ id_servico, id_colaborador }, ...]

    if (!Array.isArray(servicos)) {
        return res.status(400).json({ error: 'Os dados enviados devem ser um array' });
    }

    try {
        const values = servicos.map(({ id_servico, id_colaborador }) =>
            `(${id_colaborador}, ${id_servico})`
        ).join(', ');

        const sql = `
            INSERT INTO colaborador_servico (id_colaborador, id_servico)
            VALUES ${values};
        `;

        await pool.query(sql);
        res.status(200).json({ message: 'Serviços salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar serviços:', error);
        res.status(500).json({ error: 'Erro ao salvar serviços.' });
    }
});




module.exports = router;