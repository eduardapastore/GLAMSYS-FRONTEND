import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import axios from 'axios';

import { number } from 'framer-motion';

const Dashboard = () => {



  const [totalClientes, setTotalClientes] = useState(0);

  const [totalAgendamentosHoje, setTotalAgendamentosHoje] = useState(0);
  
  const [servicoMaisContratado, setServicoMaisContratado] = useState('');
  
  const [funcionarioMes, setFuncionarioMes] = useState('');
  
  const [fluxoCaixa, setFluxoCaixa] = useState({
    entradas: 0,
    saidas: 0,
    saldo: 0
  });
  
  const [chartData, setChartData] = useState([]);
  
  const [agendamentosHoje, setAgendamentosHoje] = useState([]);
  
  useEffect(() => {

    carregarDashboard();
  
  }, []);
  
  const carregarDashboard = async () => {
  
    try {
  
      const [
        clientes,
        agendamentos,
        servico,
        funcionario,
        fluxo,
        grafico,
        listaAgendamentos
      ] = await Promise.all([
  
        axios.get('http://localhost:3000/cliente/quantidade'),
  
        axios.get('http://localhost:3000/dashboard/agendamentos-hoje'),
  
        axios.get('http://localhost:3000/dashboard/servico-mais-contratado-mes'),
  
        axios.get('http://localhost:3000/dashboard/funcionario-mes'),
  
        axios.get('http://localhost:3000/dashboard/fluxo-caixa'),
  
        axios.get('http://localhost:3000/dashboard/fluxo-caixa-grafico'),
  
        axios.get('http://localhost:3000/dashboard/agendamentos-dia')
  
      ]);
  
      setTotalClientes(clientes.data.total);
  
      setTotalAgendamentosHoje(
        agendamentos.data.total
      );
  
      setServicoMaisContratado(
        servico.data.descricao
      );
  
      setFuncionarioMes(
        funcionario.data.nome
      );
  
      setFluxoCaixa(
        fluxo.data
      );
  
      setChartData(
        grafico.data.map(item => ({
          name: item.mes,
          entradas: Number(item.entradas),
          saidas: Number(item.saidas)
        }))
      );
  
      setAgendamentosHoje(
        listaAgendamentos.data
      );
  
    } catch (error) {
  
      console.error(error);
  
    }
  
  };

  return (
    <div className='w-screen flex h-screen overflow-hidden bg-transparent'>
      <Navbar />
      <main className='p-6 w-full h-full overflow-y-auto flex flex-col gap-6'>
        
        {/* TOPO */}
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>

        <div className='flex gap-2 items-center text-white justify-between'>
            <div className='flex gap-4 bg-gray-950 p-3 text-xs rounded-md items-center shadow-md'>
              <i className="bi bi-people text-xl"></i>
              <div>
                <p className='font-semibold'>Total Clientes Cadastrados</p>
                <p className='text-xs'>
  {totalClientes}
</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-700 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-calendar-check-fill text-xl"></i>
              <div>
                <p className='font-semibold'>Total de Agendamentos Hoje</p>
                <p className='text-xs'>
  {totalAgendamentosHoje}
</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-600 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-stars text-xl"></i>
              <div>
                <p className='font-semibold'>Serviço mais contratado no mês</p>
                <p className='text-xs'>
  {servicoMaisContratado}
</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-500 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-person-arms-up text-xl"></i>
              <div>
                <p className='font-semibold'>Funcionário do Mês</p>
                <p className='text-xs'>
  {funcionarioMes}
</p>
              </div>
            </div>

          </div>

        {/* BLOCO CENTRAL (GRÁFICO + CALENDÁRIO) */}
        <div className='flex flex-wrap lg:flex-nowrap gap-6 items-start'>     
          <style>{`
            .mini-calendar .fc { font-family: inherit; }
            .mini-calendar .fc-header-toolbar { margin-bottom: 0.5rem !important; padding: 4px; }
            .mini-calendar .fc-toolbar-title { font-size: 0.85rem !important; font-weight: 700; text-transform: uppercase; color: #374151; }
            .mini-calendar .fc-col-header-cell-cushion { font-size: 0.65rem !important; font-weight: 700; text-transform: uppercase; color: #9ca3af; padding: 4px 0 !important; }
            .mini-calendar .fc-daygrid-day-number { font-size: 0.75rem !important; font-weight: 600; color: #4b5563; padding: 2px 4px !important; }
            .mini-calendar .fc-day-today { background-color: #fef3c7 !important; }
            .mini-calendar .fc-day-today .fc-daygrid-day-number { color: #d97706 !important; font-weight: 800; }
            .mini-calendar .fc-event { background-color: #d97706 !important; border: none !important; border-radius: 3px !important; padding: 0px 2px !important; margin: 1px 2px !important; }
            .mini-calendar .fc-event-title { font-size: 0.65rem !important; font-weight: 500; color: #ffffff !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .mini-calendar .fc-theme-standard td, .mini-calendar .fc-theme-standard th { border: 1px solid #f3f4f6 !important; }
          `}</style>

          {/* FINANCEIRO */}
          <div className="flex-1 bg-amber-50 p-4 rounded-xl shadow-sm min-h-[316px] flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Fluxo de Caixa</p>
              <LineChart width={480} height={160} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="entradas" stroke="#10b981" name="Entradas" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="saidas" stroke="#ef4444" name="Saídas" strokeWidth={2} dot={false} />
              </LineChart>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-gray-200 mt-2">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Entradas</span>
                <span className="text-sm font-bold text-gray-800">R$ {Number(fluxoCaixa.entradas).toFixed(2)}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-red-100">
                <span className="text-[10px] uppercase font-bold text-red-500 block">Saídas</span>
                <span className="text-sm font-bold text-gray-800">R$ {Number(fluxoCaixa.saidas).toFixed(2)}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Saldo</span>
                <span className={`text-sm font-bold ${(fluxoCaixa.saldo) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  R$ {Number(fluxoCaixa.saldo).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* CALENDÁRIO */}
          {/* AGENDAMENTOS DO DIA */}
          <div className='w-full lg:w-[320px] bg-amber-50 p-4 rounded-xl shadow-sm lg:order-last'>
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
              Agendamentos do Dia - <span className="text-amber-700 font-bold">Total {agendamentosHoje.length}</span>
            </p>

              <div className="flex flex-col gap-3 max-h-[316px] overflow-y-auto">
                {agendamentosHoje.map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="bg-white rounded-xl p-3 border border-gray-100 hover:border-amber-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800">
                          {agendamento.cliente}
                        </h4>

                        <p className="text-xs text-gray-500 mt-1">
                          {agendamento.servico}
                        </p>
                      </div>

                      <div className="bg-amber-100 text-amber-700 font-bold text-xs px-3 py-1 rounded-full">
                        {agendamento.horario}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
      </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;