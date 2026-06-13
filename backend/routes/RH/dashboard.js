const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');
console.log('Dashboard routes carregadas');

router.get('/teste', (req, res) => {
  res.json({ ok: true });
});

router.get('/agendamentos-hoje', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT COUNT(*) AS total
        FROM agendamentos
        WHERE data = CURDATE()
      `);
  
      res.json(rows[0]);
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar agendamentos do dia'
      });
  
    }
  });

  router.get('/servico-mais-contratado-mes', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT
          s.descricao,
          COUNT(*) AS total
        FROM agendamentos a
        INNER JOIN servico s ON s.id = a.servico_id
        WHERE MONTH(a.data) = MONTH(CURDATE())
        AND YEAR(a.data) = YEAR(CURDATE())
        GROUP BY s.id, s.descricao
        ORDER BY total DESC
        LIMIT 1
      `);
  
      res.json(
        rows[0] || {
          descricao: 'Nenhum serviço',
          total: 0
        }
      );
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar serviço do mês'
      });
  
    }
  });

  router.get('/funcionario-mes', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT
          c.nome,
          COUNT(os.id) AS total
        FROM ordens_servico os
        INNER JOIN colaboradores c
          ON c.id = os.colaborador_id
        WHERE os.status = 'FECHADA'
        AND MONTH(os.data_abertura) = MONTH(CURDATE())
        AND YEAR(os.data_abertura) = YEAR(CURDATE())
        GROUP BY c.id, c.nome
        ORDER BY total DESC
        LIMIT 1
      `);
  
      res.json(
        rows[0] || {
          nome: 'Nenhum colaborador',
          total: 0
        }
      );
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar funcionário do mês'
      });
  
    }
  });

  router.get('/fluxo-caixa', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT
          SUM(
            CASE
              WHEN tl.desc = 'RECEITA'
              THEN lf.valor
              ELSE 0
            END
          ) AS entradas,
  
          SUM(
            CASE
              WHEN tl.desc IN ('DESPESA','DESPESAS FIXAS')
              THEN lf.valor
              ELSE 0
            END
          ) AS saidas
  
        FROM lancamentos_financeiros lf
        INNER JOIN tipo_lancamento tl
          ON tl.id = lf.tipo_lancamento_id
      `);
  
      const entradas = Number(rows[0].entradas || 0);
      const saidas = Number(rows[0].saidas || 0);
  
      res.json({
        entradas,
        saidas,
        saldo: entradas - saidas
      });
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar fluxo de caixa'
      });
  
    }
  });

  router.get('/fluxo-caixa-grafico', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT
          YEAR(lf.data_lancamento) AS ano,
          MONTH(lf.data_lancamento) AS mes,
  
          SUM(
            CASE
              WHEN tl.desc = 'RECEITA'
              THEN lf.valor
              ELSE 0
            END
          ) AS entradas,
  
          SUM(
            CASE
              WHEN tl.desc IN ('DESPESA','DESPESAS FIXAS')
              THEN lf.valor
              ELSE 0
            END
          ) AS saidas
  
        FROM lancamentos_financeiros lf
  
        INNER JOIN tipo_lancamento tl
          ON tl.id = lf.tipo_lancamento_id
  
        GROUP BY
          YEAR(lf.data_lancamento),
          MONTH(lf.data_lancamento)
  
        ORDER BY
          YEAR(lf.data_lancamento),
          MONTH(lf.data_lancamento)
      `);
  
      res.json(rows);
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar gráfico financeiro'
      });
  
    }
  });

  router.get('/agendamentos-dia', async (req, res) => {
    try {
  
      const [rows] = await pool.query(`
        SELECT
          a.id,
          c.nome_razao AS cliente,
          s.descricao AS servico,
          TIME_FORMAT(a.hora,'%H:%i') AS horario
        FROM agendamentos a
        INNER JOIN clientes c
          ON c.id = a.cliente_id
        INNER JOIN servico s
          ON s.id = a.servico_id
        WHERE a.data = CURDATE()
        ORDER BY a.hora
      `);
  
      res.json(rows);
  
    } catch (err) {
  
      console.error(err);
  
      res.status(500).json({
        error: 'Erro ao buscar agendamentos do dia'
      });
  
    }
  });
module.exports = router;