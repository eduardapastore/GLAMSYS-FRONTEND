import Navbar from '../../components/Navbar';
import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Serviços = () => {
  // ESTADOS DOS MODAIS
  const [isModalAddServico, setModalAddServico] = useState(false);
  const [isModalEditServico, setModalEditServico] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const [servicosFiltrados, setServicosFiltrados] = useState([]);
  const [pesquisa, setPesquisa] = useState(''); // Texto do campo de pesquisa

  // CÁLCULO DE PREÇO DO SERVIÇO (Simulação do Modal Add)
  const [precoServico, setPrecoServico] = useState(0);
  const [comissaoPercentual, setComissaoPercentual] = useState(0);
  const [taxaNoShow, setTaxaNoShow] = useState(0);

  // PREÇO DA COMISSÃO
  const valorComissaoRS = (Number(precoServico) * Number(comissaoPercentual)) / 100;

  // PREÇO FINAL
  const precoFinal = Number(precoServico) + Number(taxaNoShow);

  // DUMMY DATA RESTAURADA
  const dummyServicos = [
    { id: 1, nome: "Hidratação Profunda", descricao: "Hidratação Profunda", categoria: "Cabelo", valor: 80.00, duracao: "60 min", comissao: "40%" },
    { id: 2, nome: "Limpeza de Pele", descricao: "Limpeza de Pele", categoria: "Estética", valor: 120.00, duracao: "90 min", comissao: "50%" }
  ];

  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/servicos')
      .then(response => {
        setServicos(response.data);
        setServicosFiltrados(response.data);
      })
      .catch(() => {
        toast.error('Erro ao carregar serviços do servidor. Usando dados locais.');
        // Se a API falhar, carrega os dados dummy para a tela não quebrar
        setServicos(dummyServicos);
        setServicosFiltrados(dummyServicos);
      });
  }, []);

  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");
  const [servico_id, setServicoId] = useState("");

  const salvarServico = () => {
    if (!descricao || !categoria || !valor || !duracao) {
      return toast.error("Preencha os campos obrigatórios!");
    }

    axios.post('http://localhost:3000/servicos', {
      descricao,
      categoria,
      valor,
      duracao
    })
      .then(() => {
        toast.success('Serviço salvo!');
      })
      .catch(() => toast.error('Erro ao salvar Serviço'));
  };
  const [editValor, setEditValor] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editDuracao, setEditDuracao] = useState("");
  const salvarAlteracoes = async () => {
    try {
      await axios.put(`http://localhost:3000/servicos/${servicoSelecionado.id}`, { descricao: editDescricao, valor: editValor, duracao: editDuracao });
      toast.success("Item atualizado!");
      setModalEditServico(false);
      carregarDados();
    } catch (error) { toast.error("Erro ao atualizar!"); }
  };

  const excluirServico = async () => {
    try {
      await axios.delete(`http://localhost:3000/servicos/${servicoSelecionado.id}`);
      toast.success("Serviço excluído!");
      setModalEditServico(false);
      carregarDados();
    }
    catch (error) { toast.error("Erro ao excluir!"); }

  };
  const carregarDados = () => {
    axios.get('http://localhost:3000/servicos').then(res => {
      setServicos(res.data);
      setServicosFiltrados(res.data);
    }).catch(() => toast.error("Erro nos serviços"));
  };


  const iconesCategoria = {
    "Cabelo": "bi-scissors",
    "Estética": "bi-magic",
    "Unhas": "bi-hand-index-thumb",
    "Default": "bi-stars"
  };

  // Função para abrir edição
  const abrirEdicao = (servico) => {
    setServicoSelecionado(servico);

    setEditDescricao(servico.descricao);
    setEditValor(servico.valor);
    setEditDuracao(servico.duracao);

    setModalEditServico(true);
  };

  // FUNÇÃO PARA FILTRAR SERVIÇOS
  const filtrarServicos = () => {
    if (!pesquisa.trim()) {
      setServicosFiltrados(servicos);
      return;
    }

    const filtrados = servicos.filter(servico =>
      servico.descricao?.toLowerCase().includes(pesquisa.toLowerCase())
    );

    setServicosFiltrados(filtrados);
  };

  return (
    <main className='w-screen flex h-screen overflow-x-hidden bg-transparent'>
      <Navbar />
      <Toaster />

      <section className='p-6 w-screen h-full'>
        {/* HEADER */}
        <div className='flex justify-between mb-6'>
          <h2 className='font-bold text-2xl text-gray-800'>Serviços</h2>
          <div className='flex gap-2 text-xs'>
            {/* <button className='p-2 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-50 flex items-center gap-1'>
              <i className="bi bi-clipboard2-data"></i> Relatório
            </button> */}
            <button
              onClick={() => setModalAddServico(true)}
              className='p-2 rounded-md font-semibold bg-amber-600 text-amber-50 hover:bg-amber-700 flex items-center gap-1'
            >
              <i className="bi bi-plus-lg"></i> Adicionar Serviço
            </button>
          </div>
        </div>

        {/* PESQUISA */}
        <div className='flex gap-2 justify-between items-baseline'>
          <h3 className="font-bold mb-4 text-base uppercase text-gray-500 text-[10px]">Listagem de Serviços</h3>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder=" Pesquisar..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-64 bg-amber-50 shadow-md p-2 text-sm rounded-md outline-none focus:border-amber-600"
            />
            <button
              onClick={filtrarServicos}
              className="p-2 bg-amber-600 rounded-md text-white hover:bg-amber-700"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* GRID DE SERVIÇOS */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {servicosFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              Nenhum serviço encontrado
            </div>
          ) : (
            servicosFiltrados.map((servico) => (
              <div key={servico.id} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-700 flex items-center justify-center rounded-md text-xl">
                    <i className={`bi ${iconesCategoria[servico.categoria] || iconesCategoria["Default"]}`}></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 leading-none mb-1">{servico.descricao}</p>
                    <div className="flex gap-2 text-[10px] uppercase font-bold text-gray-500">
                      <span>{servico.duracao}</span>
                      <span>•</span>
                      <span className="text-green-600">R$ {parseFloat(servico.valor || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => abrirEdicao(servico)} className="text-gray-500 hover:text-amber-600 p-2 transition-colors">
                  <i className="bi bi-pencil-square text-lg"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* MODAL ADICIONAR */}
      {isModalAddServico && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

            {/* HEADER FIXO */}
            <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-300">
              <div>
                <h3 className="font-bold text-xl text-gray-800 uppercase">Novo Serviço</h3>
              </div>
              <button onClick={() => setModalAddServico(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>

            {/* CONTEÚDO COM SCROLL */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
              <form className="flex flex-col gap-4">

                {/* NOME E CATEGORIA */}
                <div className="flex flex-col gap-1">
                  <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Nome do Serviço</label>
                  <input 
                    type="text" 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex: Progressiva Sem Formol" 
                    className="border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Categoria */}
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Categoria</label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="Cabelo">Cabelo</option>
                      <option value="Barbearia">Barbearia</option>
                      <option value="Unhas">Unhas</option>
                      <option value="Estetic facial">Estética facial</option>
                      <option value="Depilação">Depilação</option>
                    </select>
                  </div>

                  {/* Duração */}
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Duração</label>
                    <select
                      value={duracao}
                      onChange={(e) => setDuracao(e.target.value)}
                      className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="30 min">30 min</option>
                      <option value="60 min">60 min</option>
                      <option value="90 min">90 min</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 col-span-2">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Preço do Serviço</label>
                    <input
                      type="number"
                      value={valor}
                      onChange={(e) => {
                        setValor(e.target.value);
                        setPrecoServico(e.target.value);
                      }}
                      className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* FINANCEIRO */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex flex-col gap-3">
                  <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Valor do Serviço (Simulação)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Comissão (%)</label>
                      <input
                        type="number"
                        value={comissaoPercentual}
                        onChange={e => setComissaoPercentual(e.target.value)}
                        className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Ex: 40"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Taxa de no-show</label>
                      <input
                        type="number"
                        value={taxaNoShow}
                        onChange={e => setTaxaNoShow(e.target.value)}
                        className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Valor em faltas"
                      />
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-white rounded-lg border border-amber-200">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">O profissional receberá:</span>
                      <span className="font-bold text-green-600">R$ {valorComissaoRS.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black border-t pt-1">
                      <span className="text-gray-800">PREÇO FINAL AO CLIENTE:</span>
                      <span className="text-amber-700">R$ {precoFinal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* DESCRIÇÃO */}
                <div className="flex flex-col gap-1">
                  <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Descrição</label>
                  <textarea rows="3" className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
                </div>
              </form>
            </div>

            {/* FOOTER FIXO */}
            <div className="p-6 w-full border-t border-gray-200 flex gap-2 bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={() => { salvarServico(); setModalAddServico(false); }}
                className="w-full flex gap-2 justify-center text-xl bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700"
              >
                Salvar Serviço
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIÇÃO */}
      {isModalEditServico && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
              <h3 className="font-bold text-lg text-gray-800 uppercase">Editar - {servicoSelecionado?.descricao}</h3>
              <button onClick={() => setModalEditServico(false)} className="text-gray-500 hover:text-red-500">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <form className="flex flex-col gap-3">
              <label className='text-xs font-bold text-gray-400 uppercase'>Nome do Serviço</label>
              <input
                type="text"
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
                className="border p-2 rounded-md focus:border-amber-600 outline-none"
              />

              <div className="flex gap-2">
                <div className='w-1/2 flex flex-col'>
                  <label className='text-xs font-bold text-gray-400 uppercase mb-2'>Preço</label>
                  <input
                    type="number"
                    value={editValor}
                    onChange={(e) => setEditValor(e.target.value)}
                    className="border p-2 rounded-md outline-none"
                  />
                </div>
                <div className='w-1/2 flex flex-col'>
                  <label className='text-xs font-bold text-gray-400 uppercase mb-2'>Duração</label>
                  <input
                    type="text"
                    value={editDuracao}
                    onChange={(e) => setEditDuracao(e.target.value)}
                    className="border p-2 rounded-md outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={salvarAlteracoes}
                className="bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 mt-2"
              >
                Salvar Alterações
              </button>
              <button type="button" onClick={excluirServico} className="bg-red-600 p-2 rounded-md text-amber-50 text-base font-semibold hover:bg-red-800">Excluir Serviço</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Serviços;