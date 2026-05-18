import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import axios from 'axios';

const Dashboard = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const hoje = new Date().toISOString().split('T')[0];

  useEffect(() => {
    axios.get('http://localhost:3000/agendamentos/detalhes2')
      .then((res) => {
        setAgendamentos(res.data.map(item => ({
          id: String(item.id),
          title: `${item.nome_cliente || item.nome || 'Agendamento'} (${item.horario?.slice(0, 5)})`,
          start: item.data ? item.data.split('T')[0] : hoje,
          rawDate: item.data,
          entrada: item.entrada || Math.floor(Math.random() * 100) + 50,
          saida: item.saida || Math.floor(Math.random() * 30) + 5
        })));
      })
      .catch(() => setAgendamentos([
        { id: '1', title: 'Ev. Macedo (09:00)', start: hoje, rawDate: hoje, entrada: 150, saida: 30 },
        { id: '2', title: 'C. Fausto (10:30)', start: hoje, rawDate: hoje, entrada: 50, saida: 10 },
        { id: '3', title: 'M. Costa (14:00)', start: hoje, rawDate: hoje, entrada: 80, saida: 15 },
      ]));
  }, []);

  let totalEntradas = 0, totalSaidas = 0;
  const financeiroPorMes = {};

  agendamentos.forEach(item => {
    const mes = new Date(item.rawDate || item.start).toLocaleString("pt-BR", { month: "short" }).toUpperCase();
    if (mes !== "INVALID DATE") {
      if (!financeiroPorMes[mes]) financeiroPorMes[mes] = { entradas: 0, saidas: 0 };
      financeiroPorMes[mes].entradas += Number(item.entrada || 0);
      financeiroPorMes[mes].saidas += Number(item.saida || 0);
      totalEntradas += Number(item.entrada || 0);
      totalSaidas += Number(item.saida || 0);
    }
  });

  const chartData = Object.keys(financeiroPorMes).map(mes => ({
    name: mes,
    entradas: financeiroPorMes[mes].entradas,
    saidas: financeiroPorMes[mes].saidas
  }));

  return (
    <div className='w-screen flex h-screen overflow-hidden bg-transparent'>
      <Navbar />
      <main className='p-6 w-full h-full overflow-y-auto flex flex-col gap-6'>
        
        {/* TOPO */}
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex gap-2">
            <input type="text" placeholder=" Pesquisar..." className="w-64 border p-2 rounded-md text-sm outline-none focus:border-amber-600" />
            <button className="p-2 w-10 h-10 bg-amber-600 rounded-md text-white"><i className="bi bi-search"></i></button>
          </div>
        </div>

        <div className='flex gap-2 items-center text-white justify-between'>
            <div className='flex gap-4 bg-gray-950 p-3 text-xs rounded-md items-center shadow-md'>
              <i className="bi bi-people text-xl"></i>
              <div>
                <p className='font-semibold'>Total Clientes Cadastrados</p>
                <p className='text-xs'>10</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-700 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-calendar-check-fill text-xl"></i>
              <div>
                <p className='font-semibold'>Total de Agendamentos Hoje</p>
                <p className='text-xs'>3</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-600 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-stars text-xl"></i>
              <div>
                <p className='font-semibold'>Serviço mais contratado no mês</p>
                <p className='text-xs'>Corte e Barba</p>
              </div>
            </div>

            <div className='flex gap-4 bg-amber-500 p-3 text-xs rounded-md items-center shadow-md'>
              <i class="bi bi-person-arms-up text-xl"></i>
              <div>
                <p className='font-semibold'>Funcionário do Mês</p>
                <p className='text-xs'>Fulano de Tal</p>
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
          <div className="flex-1 bg-amber-50 p-4 rounded-xl border shadow-sm min-h-[316px] flex flex-col justify-between">
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

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 mt-2">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Entradas</span>
                <span className="text-sm font-bold text-gray-800">R$ {totalEntradas.toFixed(2)}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-red-100">
                <span className="text-[10px] uppercase font-bold text-red-500 block">Saídas</span>
                <span className="text-sm font-bold text-gray-800">R$ {totalSaidas.toFixed(2)}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Saldo</span>
                <span className={`text-sm font-bold ${(totalEntradas - totalSaidas) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  R$ {(totalEntradas - totalSaidas).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* CALENDÁRIO */}
          <div className='w-full lg:w-[320px] bg-amber-50 p-4 rounded-xl border shadow-sm mini-calendar lg:order-last'>
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Agenda Mensal</p>
            <div className='h-[260px] overflow-hidden'>
              <FullCalendar
                locale={ptBrLocale}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="100%"
                headerToolbar={{ left: "prev", center: "title", right: "next" }}
                fixedWeekCount={false}
                dayMaxEventRows={2}
                events={agendamentos}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;