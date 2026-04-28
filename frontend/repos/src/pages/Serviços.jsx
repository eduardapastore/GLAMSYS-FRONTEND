import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Toaster, toast } from 'react-hot-toast';

const Serviços = () => {
  // ESTADOS DOS MODAIS
  const [isModalAddServico, setModalAddServico] = useState(false);
  const [isModalEditServico, setModalEditServico] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  // CÁLCULO DE PREÇO DO SERVIÇO
  const [precoServico, setPrecoServico] = useState(0);
  const [comissaoPercentual, setComissaoPercentual] = useState(0);
  const [taxaNoShow, setTaxaNoShow] = useState(0);

  // PREÇO DA COMISSÃO
  const valorComissaoRS = (Number(precoServico) * Number(comissaoPercentual)) / 100;

  // PREÇO FINAL
  const precoFinal = Number(precoServico) + Number(taxaNoShow);

  const dummyServicos = [
    { id: 1, nome: "Hidratação Profunda", categoria: "Cabelo", preco: 80.00, duracao: "60 min", comissao: "40%", descricao: "Tratamento intenso para fios ressecados." },
    { id: 2, nome: "Limpeza de Pele", categoria: "Estética", preco: 120.00, duracao: "90 min", comissao: "50%", descricao: "Extração de cravos e revitalização facial." }
  ];

  const iconesCategoria = {
    "Cabelo": "bi-scissors",
    "Estética": "bi-magic",
    "Unhas": "bi-hand-index-thumb",
    "Default": "bi-stars"
  };

  // Função para abrir edição
  const abrirEdicao = (servico) => {
    setServicoSelecionado(servico);
    setModalEditServico(true);
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
            <button className='p-2 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-50 flex items-center gap-1'>
              <i className="bi bi-clipboard2-data"></i> Relatório
            </button>
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
          <h3 className="font-bold mb-4 text-base uppercase text-gray-400 text-[10px]">Listagem de Serviços</h3>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder=" Pesquisar..." className="w-64 border border-gray-300 p-2 text-sm rounded-md outline-none focus:border-amber-600" />
            <button className="p-2 bg-amber-600 rounded-md text-white hover:bg-amber-700"><i className="bi bi-search"></i></button>
          </div>
        </div>

        {/* GRID DE SERVIÇOS */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {dummyServicos.map((servico) => (
            <div key={servico.id} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 flex items-center justify-center rounded-md text-xl">
                  <i className={`bi ${iconesCategoria[servico.categoria] || iconesCategoria["Default"]}`}></i>
                </div>
                <div>
                  <p className="font-bold text-gray-800 leading-none mb-1">{servico.nome}</p>
                  <div className="flex gap-2 text-[10px] uppercase font-bold text-gray-400">
                    <span>{servico.duracao}</span>
                    <span>•</span>
                    <span className="text-green-600">R$ {servico.preco.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => abrirEdicao(servico)} className="text-gray-400 hover:text-amber-600 p-2 transition-colors">
                <i className="bi bi-pencil-square text-lg"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL ADICIONAR */}
      {/* MODAL ADICIONAR */}
      {isModalAddServico && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          {/* Limitamos a altura do container principal aqui com max-h-[90vh] */}
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* HEADER FIXO */}
            <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="font-bold text-xl text-gray-800">Novo Serviço</h3>
                <p className="text-xs text-gray-400">Preencha os detalhes abaixo.</p>
              </div>
              <button onClick={() => setModalAddServico(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>

            {/* CONTEÚDO COM SCROLL (O segredo está aqui) */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
              <form className="flex flex-col gap-4">
                
                {/* NOME E CATEGORIA */}
                <div className="flex flex-col gap-1">
                  <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Nome do Serviço</label>
                  <input type="text" placeholder="Ex: Progressiva Sem Formol" className="border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Categoria</label>
                    <select className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                      <option>Cabelo</option>
                      <option>Estética</option>
                      <option>Manicure</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Duração</label>
                    <select className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                      <option>30 min</option>
                      <option>60 min</option>
                      <option>90 min</option>
                    </select>
                  </div>
                </div>

                {/* FINANCEIRO */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex flex-col gap-3">
                  <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Valor do Serviço</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Preço do Serviço</label>
                      <input 
                        type="number" 
                        value={precoServico}
                        onChange={e => setPrecoServico(e.target.value)}
                        className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" 
                        placeholder="0.00"
                      />
                    </div>
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
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className='text-[10px] font-bold text-gray-500 uppercase ml-1'>Taxa de no-show</label>
                    <input 
                      type="number" 
                      value={taxaNoShow}
                      onChange={e => setTaxaNoShow(e.target.value)}
                      className="border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-400" 
                      placeholder="Valor cobrado em faltas"
                    />
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
            <div className="p-6 border-t border-gray-50 flex gap-2 bg-gray-50 rounded-b-xl">
              <button 
                type="button" 
                onClick={() => setModalAddServico(false)}
                className="flex-1 py-2.5 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition-all"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={() => {toast.success("Serviço salvo!"); setModalAddServico(false)}} 
                className="flex-[2] bg-amber-600 text-white font-bold py-2.5 rounded-lg hover:bg-amber-700 shadow-md transition-all"
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
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xl">Editar - {servicoSelecionado?.nome}</h3>
              <button onClick={() => setModalEditServico(false)} className="text-gray-400 hover:text-red-500"><i className="bi bi-x-lg"></i></button>
            </div>
            <form className="flex flex-col gap-3">
              <label className='text-xs font-bold text-gray-400 uppercase'>Nome do Serviço</label>
              <input type="text" defaultValue={servicoSelecionado?.nome} className="border p-2 rounded-md focus:border-amber-600 outline-none" />
              
              <div className="flex gap-2">
                <div className='w-1/2 flex flex-col'>
                  <label className='text-xs font-bold text-gray-400 uppercase mb-2'>Preço</label>
                  <input type="text" defaultValue={servicoSelecionado?.preco} className="border p-2 rounded-md outline-none" />
                </div>
                <div className='w-1/2 flex flex-col'>
                  <label className='text-xs font-bold text-gray-400 uppercase mb-2'>Duração</label>
                  <input type="text" defaultValue={servicoSelecionado?.duracao} className="border p-2 rounded-md outline-none" />
                </div>
              </div>

              <button type="button" onClick={() => {toast.success("Serviço atualizado!"); setModalEditServico(false)}} className="bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 mt-2">Salvar Alterações</button>
              <button type="button" className="bg-red-600 p-2 rounded-md text-amber-50 text-base font-semibold hover:bg-red-800">Excluir Serviço</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Serviços;