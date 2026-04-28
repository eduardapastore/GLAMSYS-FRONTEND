import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import toast, { Toaster } from 'react-hot-toast';

const Confirmacoes = () => {
    const [eventos, setEventos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [ordemSelecionada, setOrdemSelecionada] = useState(null);

    const dummyOrdens = [
        { id: 1, cliente_nome: "Ana Silva", servico_nome: "Corte e Escova", data_agendamento: "2026-04-20", status: "ABERTO", valor: 120.00, hora: "14:00" },
        { id: 2, cliente_nome: "Marcos Oliveira", servico_nome: "Barba e Cabelo", data_agendamento: "2026-04-20", status: "REALIZADO", valor: 85.00, hora: "15:30" },
        { id: 3, cliente_nome: "Juliana Costa", servico_nome: "Manicure", data_agendamento: "2026-04-21", status: "ABERTO", valor: 50.00, hora: "09:00" },
    ];

    useEffect(() => {
        carregarEventos();
    }, []);

    const carregarEventos = () => {
        const dadosFormatados = dummyOrdens.map(os => ({
            id: os.id,
            title: `${os.cliente_nome} - ${os.servico_nome}`, 
            start: os.data_agendamento, 
            backgroundColor: os.status === 'REALIZADO' ? '#10b981' : '#f59e0b',
            borderColor: 'transparent',
            extendedProps: { ...os } // Passamos todos os dados para cá
        }));
        setEventos(dadosFormatados);
    };

    // FUNÇÃO CHAMADA AO CLICAR NO EVENTO
    const handleEventClick = (info) => {
        setOrdemSelecionada(info.event.extendedProps);
        setModalAberto(true);
    };

    const confirmarPagamento = () => {
        toast.success(`Pagamento de ${ordemSelecionada.cliente_nome} confirmado!`);
        setModalAberto(false);
        // Aqui você faria o axios.put para atualizar o status no banco
    };

    return (
        <main className="w-screen flex h-screen overflow-hidden ">
            <Navbar />
            <Toaster position="top-right" />
            
            <section className="p-6 flex-1 h-full overflow-y-auto flex flex-col gap-4">
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-2xl text-gray-800'>Confirmações</h2>
                    <div className="flex gap-2">
                        <input 
                        type="text" placeholder=" Pesquisar..." 
                        className="w-64 border p-2 rounded-md text-sm outline-none shadow-sm focus:border-amber-600"
                        />
                        <button className="p-2 w-10 h-10 bg-amber-600 rounded-md text-white hover:bg-amber-700 transition-all">
                        <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className='p-4 rounded-xl shadow-sm border  flex-1'>
                    <FullCalendar
                        locale={ptBrLocale}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={eventos} 
                        eventClick={handleEventClick} // Gatilho do clique
                        headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
                        height="100%"
                        eventContent={(arg) => (
                            <div className="p-1 truncate cursor-pointer">
                                <div className="flex items-center gap-1 text-white">
                                    <span className="font-bold uppercase text-[9px] truncate">
                                        {arg.event.title}
                                    </span>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </section>

            {/* MODAL DE CONFIRMAÇÃO DE DADOS */}
            {modalAberto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className={`p-4 ${ordemSelecionada.status === 'REALIZADO' ? 'bg-green-600' : 'bg-amber-500'} text-white`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs opacity-80 uppercase font-bold">Detalhes do Agendamento</p>
                                    <h3 className="text-xl font-bold">{ordemSelecionada.cliente_nome}</h3>
                                </div>
                                <button onClick={() => setModalAberto(false)} className="hover:bg-black/10 rounded-full p-1 transition-all">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Serviço</span>
                                    <span className="font-semibold text-gray-700">{ordemSelecionada.servico_nome}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Horário</span>
                                    <span className="font-semibold text-gray-700">{ordemSelecionada.hora}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Valor</span>
                                    <span className="font-bold text-green-600 text-lg">R$ {ordemSelecionada.valor.toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Status Atual</span>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full w-fit mt-1 ${ordemSelecionada.status === 'PAGO' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {ordemSelecionada.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                {ordemSelecionada.status !== 'REALIZADO' && (
                                    <button 
                                        onClick={confirmarPagamento}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-100"
                                    >
                                        Confirmar Agendamento
                                    </button>
                                )}
                                <button 
                                    onClick={() => setModalAberto(false)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-all"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .fc .fc-toolbar-title { font-size: 1.1rem; font-weight: 700; color: #374151; }
                .fc .fc-button-primary { background-color: #d97706; border: none; font-weight: 600; }
                .fc-event { border-radius: 4px; padding: 2px; }
            `}</style>
        </main>
    );
};

export default Confirmacoes;