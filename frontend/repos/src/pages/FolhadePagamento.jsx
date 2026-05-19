import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import axios from 'axios'

const FolhadePagamento = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const [lancamento, setLancamento] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  const [formData, setFormData] = useState({
    salario_fixo: '',
    tipo_chave_pix: '',
    chave_pix: '',
    porcentagem_comissao: '',
    agencia: '',
    numero_conta: '',
    vale_alimentacao: '',
    vale_transporte: '',
    colaborador_id: ''
  });

  // carregar pagamentos
  useEffect(() => {
    buscarPagamentos();
  }, []);

  const buscarPagamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pagcolaboradores');

      setLancamento(response.data);

      // montar options do select
      const options = response.data.map((item) => ({
        value: item.colaborador_id,
        label: `Colaborador ${item.colaborador_id}`
      }));

      setColaboradores(options);

    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar folhas de pagamento');
    }
  };

  // registrar pagamento
  const registrarPagamento = async () => {

    try {

      await axios.post('http://localhost:3000/pagcolaboradores', formData);

      toast.success('Pagamento registrado com sucesso!');

      setModalOpen(false);

      // limpar form
      setFormData({
        salario_fixo: '',
        tipo_chave_pix: '',
        chave_pix: '',
        porcentagem_comissao: '',
        agencia: '',
        numero_conta: '',
        vale_alimentacao: '',
        vale_transporte: '',
        colaborador_id: ''
      });

      buscarPagamentos();

    } catch (error) {
      console.error(error);
      toast.error('Erro ao registrar pagamento');
    }
  };

  return (
    <main className="w-screen flex h-screen overflow-hidden bg-inherit">
      <Navbar />
      <Toaster />

      <section className="p-6 w-full h-full overflow-y-auto">

        <div className='flex justify-between'>
          <h1 className="font-bold text-2xl text-gray-800">
            Folha de Pagamento
          </h1>

          <div className='flex gap-3'>

            <button
              onClick={() => setModalOpen(true)}
              className='flex gap-2 p-3 text-sm font-semibold bg-amber-600 text-white align-middle rounded-md hover:bg-amber-700 transition-colors'
            >
              <i className="bi bi-plus-circle-fill"></i>
              Registrar Pagamento
            </button>

          </div>
        </div>

        <h3 className="text-base text-gray-600 font-medium mb-4 mt-4">
          Histórico Recente
        </h3>

        <section className='rounded-2xl flex-1 flex flex-col overflow-hidden'>

          <div className='flex-1 overflow-y-auto space-y-3 pr-2'>

            {lancamento.map((item, index) => {

              return (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-md flex justify-between items-center shadow-sm hover:border-amber-200 transition-all"
                >

                  <div className='w-full flex items-center align-middle justify-between'>

                    <div>
                      <p className="text-md font-bold text-gray-800">
                        Colaborador: {item.colaborador_nome}
                      </p>

                      <p className="text-[10px] text-gray-400 uppercase">
                        PIX: {item.chave_pix}
                      </p>
                    </div>

                    <div>
                      <p className='text-lg font-black text-amber-600'>
                        R$ {Number(item.salario_fixo).toFixed(2)}
                      </p>
                    </div>

                  </div>

                </div>
              )
            })}

          </div>

        </section>

      </section>

      {/* modal */}
      {modalOpen && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-lg w-full max-w-md shadow-xl flex flex-col max-h-[90vh]">

            <div className='flex justify-between items-center p-6 border-b'>

              <h2 className='font-bold text-gray-800 text-lg'>
                Registrar Pagamento
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <div className='p-6 pt-2 w-full flex flex-col gap-3'>

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Colaborador
              </label>

              <Select
                options={colaboradores}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    colaborador_id: selected.value
                  })
                }
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Salário Fixo
              </label>

              <input
                type="number"
                step="0.01"
                value={formData.salario_fixo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salario_fixo: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Tipo chave pix
              </label>

              <input
                type="text"
                value={formData.tipo_chave_pix}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo_chave_pix: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Chave pix
              </label>

              <input
                type="text"
                value={formData.chave_pix}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chave_pix: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Comissão %
              </label>

              <input
                type="number"
                value={formData.porcentagem_comissao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    porcentagem_comissao: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Agência
              </label>

              <input
                type="text"
                value={formData.agencia}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agencia: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Número da conta
              </label>

              <input
                type="text"
                value={formData.numero_conta}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numero_conta: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Vale alimentação
              </label>

              <input
                type="number"
                value={formData.vale_alimentacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vale_alimentacao: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

              <label className='text-[10px] font-bold text-gray-600 uppercase'>
                Vale transporte
              </label>

              <input
                type="number"
                value={formData.vale_transporte}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vale_transporte: e.target.value
                  })
                }
                className='border border-gray-400 p-2 rounded-md text-sm outline-none focus:border-amber-600'
              />

            </div>

            <div className="p-4 pt-3 bg-gray-50 border-t rounded-md">

              <button
                onClick={registrarPagamento}
                className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700 transition-all shadow-md"
              >
                Registrar Pagamento
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default FolhadePagamento