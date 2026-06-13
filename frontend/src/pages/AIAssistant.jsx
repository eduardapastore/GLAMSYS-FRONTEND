import React, { useState, useRef, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Webcam from 'react-webcam';

const AIAssistant = () => {
    const webcamRef = useRef(null);
    const [imagemOriginal, setImagemOriginal] = useState(null);
    const [imagemResultado, setImagemResultado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [geradorselecionado, setgeradorselecionado] = useState('');
    const [modoCamera, setModoCamera] = useState(false);

    // Estado para armazenar o retorno inteligente do cruzamento de APIs
    const [campanhaMarketing, setCampanhaMarketing] = useState(null);

    // URLs das imagens fixas controladas para o retorno do pipeline
    const resultadosFixos = {
        'avaliacao-geral': 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&q=80',
        'cor-loiro': 'https://images.unsplash.com/photo-1605497746444-ac9da5848ba7?w=600&q=80',
        'cor-ruivo': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
        'cor-platinado': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80'
    };

    const estilosCabelo = [
        {
            id: 'avaliacao-geral',
            nome: 'Avaliação Geral do Cliente',
            icon: '👁️‍🗨️',
            categoria: 'analise',
            prompt: `Create a clean, modern, and visually structured infographic titled "HAIRSTYLE ANALYSIS" using the attached portrait as the main subject. Remove the original background and replace it with a neutral, soft gray or off-white backdrop to keep focus on the face. Ensure consistent studio lighting, sharp facial details, and natural skin tones. Layout should be symmetrical, grid-based, and easy to scan. Use a minimal UI style similar to grooming or men’s style guides. Avoid long paragraphs—prioritize short labels, icons, and visual comparisons.`
        },
        {
            id: 'cor-loiro',
            nome: 'Previsão de Cor: Loiro Mel',
            icon: '👱‍♂️',
            categoria: 'cor',
            prompt: 'Simulação realista de mudança de pigmentação capilar para tonalidade loiro mel'
        },
        {
            id: 'cor-ruivo',
            nome: 'Previsão de Cor: Ruivo Acobreado',
            icon: '🧑‍🦰',
            categoria: 'cor',
            prompt: 'Simulação realista de mudança de pigmentação capilar para tonalidade ruivo acobreado'
        },
        {
            id: 'cor-platinado',
            nome: 'Previsão de Cor: Platinado Polar',
            icon: '🧑‍🦳',
            categoria: 'cor',
            prompt: 'Simulação realista de mudança de pigmentação capilar para tonalidade platinado polar'
        }
    ];

    // API DE FERIADOS + ASSOCIAÇÃO DE PROCEDIMENTOS
    async function gerarCampanhaDeFeriado() {
        try {
            // Puxa os feriados da API pública para o ano corrente (2026)
            const resFeriados = await fetch('https://brasilapi.com.br/api/feriados/v1/2026');
            const feriados = await resFeriados.json();

            // Mock dos serviços mais realizados do BD
            const meusServicosPopulares = ['Corte e Barba', 'Escova Progressiva', 'Mechas Criativas', 'Maquiagem', 'Manicure', 'Escova Modelada'];

            // Pega o primeiro feriado retornado
            const proximoFeriado = feriados[0];

            let servicosRecomendados = [];
            if (proximoFeriado.name.toLowerCase().includes('carnaval') || proximoFeriado.name.toLowerCase().includes('ano novo')) {
                servicosRecomendados = meusServicosPopulares.filter(s => s.includes('Mechas') || s.includes('Maquiagem'));
            } else {
                servicosRecomendados = meusServicosPopulares.filter(s => s.includes('Manicure') || s.includes('Escova') || s.includes('Corte'));
            }

            const dataFormatada = proximoFeriado.date.split('-').reverse().slice(0, 2).join('/');

            setCampanhaMarketing({
                campanha: `Especial ${proximoFeriado.name}`,
                dataDoFeriado: dataFormatada,
                sugestoesParaAgendamento: servicosRecomendados
            });

        } catch (error) {
            console.error("Erro ao cruzar APIs de feriados:", error);
        }
    }

    useEffect(() => {
        gerarCampanhaDeFeriado();
    }, []);

    const tirarFoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImagemOriginal(imageSrc);
            setModoCamera(false);
            toast.success("Foto do cliente capturada!");
        }
    };

    const handleUploadArquivo = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.onloadend = () => setImagemOriginal(reader.result);
            reader.readAsDataURL(arquivo);
        }
    };

    const iniciarSimulacao = async () => {
        if (!imagemOriginal) return toast.error("Por favor, envie ou tire uma foto do cliente primeiro!");
        if (!geradorselecionado) return toast.error("Selecione o tipo de previsão!");

        setCarregando(true);
        setImagemResultado(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const imagemFixaDefinida = resultadosFixos[geradorselecionado];

            if (!imagemFixaDefinida) {
                setCarregando(false);
                return toast.error("ID de renderização inválido.");
            }

            const img = new Image();
            img.src = imagemFixaDefinida;

            img.onload = () => {
                setImagemResultado(imagemFixaDefinida);
                if (geradorselecionado === 'avaliacao-geral') {
                    toast.success("Infográfico de Avaliação gerado!");
                } else {
                    toast.success("Simulação de colorimetria aplicada!");
                }
                setCarregando(false);
            };

            // Captura amigável de erro de carregamento sem quebrar a árvore do React
            img.onerror = () => {
                setCarregando(false);
                toast.error("Não foi possível carregar a imagem de simulação da IA. Verifique o link.");
            };

        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado no pipeline.");
            setCarregando(false);
        }
    };

    return (
        <main className="w-screen flex h-screen overflow-hidden bg-transparent">
            <Toaster />
            <Navbar />

            <div className='p-6 flex-1 h-full overflow-y-auto flex flex-col gap-5 select-none'>

                {/* CABEÇALHO DA PÁGINA */}
                <div>
                    <h1 className='font-bold text-2xl text-gray-900 flex items-center gap-2 mb-1'>
                        Assistente IA
                    </h1>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-gray-600 font-medium text-sm'>Sugestão de Campanha</h2>
                        <div className="relative flex flex-col items-center group">
                            <i className="bi bi-question-circle text-gray-600 cursor-pointer text-sm"></i>
                            {/* Voltou a ser uma linha só, agora centralizado perfeitamente sobre o ícone */}
                            <span className="left-5 absolute bottom-full -translate-x-1/2 z-[999] mb-2 scale-0 transition-all rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:scale-100 whitespace-nowrap shadow-md">
                                {"Esses indicadores são atualizados com base nos seus dados registrados anteriormente."}
                            </span>
                        </div>
                    </div>
                </div>

                {/* BANNER DINÂMICO REESTILIZADO (FERIADOS + PROCEDIMENTOS) */}
                {campanhaMarketing && (
                    <div className="bg-amber-50 bg-opacity-20 from-amber-500/[0.07] to-orange-500/[0.07] border border-amber-500/20 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm backdrop-blur-sm">

                        {/* Lado Esquerdo: Textos e Ícone */}
                        <div className="flex items-start gap-3.5">
                            <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600 mt-0.5 flex items-center justify-center">
                                <i className="bi bi-calendar-heart text-lg leading-none"></i>
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">
                                        {campanhaMarketing.campanha}
                                    </h4>
                                    <span className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                                        📅 {campanhaMarketing.dataDoFeriado}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs mt-1 max-w-xl leading-relaxed">
                                    Com base no fluxo histórico do salão, nossa IA sugere impulsionar serviços estratégicos de alta conversão para esta data.
                                </p>
                            </div>
                        </div>

                        {/* Lado Direito: Serviços Recomendados como Badges Modernas */}
                        <div className="flex flex-wrap gap-1.5 md:justify-end items-center max-w-xs">
                            {campanhaMarketing.sugestoesParaAgendamento.map((servico, idx) => (
                                <span
                                    key={idx}
                                    className="bg-white border w-md border-slate-200/80 text-slate-700 font-medium px-2.5 py-1 rounded-md text-[11px] tracking-wide shadow-sm hover:border-amber-500/40 transition-colors whitespace-nowrap"
                                    Dadges>
                                    ✨ {servico}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* SEÇÃO PRINCIPAL DO AVALIADOR */}
                <div className='flex gap-2 items-center -mb-2'>
                    <h2 className='text-gray-600 font-medium text-sm'>Avaliador Inteligente</h2>
                    <div className="relative flex flex-col items-start group">
                        <i className="bi bi-question-circle text-gray-500 cursor-pointer text-xs"></i>
                        <span className="absolute bottom-full left-0 z-[999] mb-2 w-64 scale-0 transition-all rounded bg-slate-900 p-2 text-xs text-white group-hover:scale-100 shadow-xl whitespace-pre-line leading-relaxed">
                            {"Este avaliador é potencializado por uma IA que pode cometer erros e deve ser usada como ferramenta de apoio, não como resultado final."}
                        </span>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start flex-1'>

                    {/* COLUNA ESQUERDA: INPUTS DE MÍDIA E CAMPOS DE SELEÇÃO */}
                    <div className='flex flex-col gap-4'>
                        <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3'>
                            <h3 className='font-bold text-xs uppercase tracking-wider text-gray-400'>1. Entrada da Imagem do Cliente</h3>

                            {modoCamera ? (
                                <div className='flex flex-col gap-3 items-center bg-slate-900 p-2 rounded-lg'>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        className='w-full max-h-64 object-cover rounded-md'
                                    />
                                    <div className='flex gap-2'>
                                        <button onClick={tirarFoto} className='bg-amber-600 text-white px-4 py-1.5 rounded-lg font-semibold text-xs hover:bg-amber-700 transition-colors'>
                                            📷 Capturar Frame
                                        </button>
                                        <button onClick={() => setModoCamera(false)} className='bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-gray-700 transition-colors'>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    {imagemOriginal ? (
                                        <div className='relative max-h-52 overflow-hidden rounded-lg border border-slate-200'>
                                            <img src={imagemOriginal} alt="Cliente" className='w-full object-cover h-48' />
                                            <button
                                                onClick={() => { setImagemOriginal(null); setImagemResultado(null); }}
                                                className='absolute top-2 right-2 bg-red-600 text-white font-bold px-2 py-1 rounded-md hover:bg-red-700 text-xs shadow-md transition-colors'
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='h-48 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 bg-slate-50/50'>
                                            <p className='text-xs font-medium'>Insira qualquer foto para liberar a IA</p>
                                        </div>
                                    )}

                                    <div className='flex gap-2 w-full'>
                                        <button
                                            onClick={() => setModoCamera(true)}
                                            className='flex-1 py-2 rounded-lg border border-slate-300 text-gray-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors'
                                        >
                                            <i className="bi bi-camera font-bold"></i> Usar Câmera
                                        </button>
                                        <label className='flex-1 py-2 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-900 cursor-pointer text-center flex items-center justify-center gap-2 transition-colors'>
                                            <i className="bi bi-upload font-bold"></i> Enviar Arquivo
                                            <input type="file" accept="image/*" onChange={handleUploadArquivo} className="hidden" />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4'>
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">2. Análise de Perfil Estrutural</h4>
                                <div className="flex flex-col gap-2">
                                    {estilosCabelo.filter(e => e.categoria === 'analise').map((estilo) => (
                                        <button
                                            key={estilo.id}
                                            type="button"
                                            onClick={() => setgeradorselecionado(estilo.id)}
                                            className={`p-3 border rounded-xl text-left flex items-center gap-3 transition-all text-sm ${geradorselecionado === estilo.id
                                                ? 'border-amber-600 bg-amber-50 font-bold text-amber-900 shadow-sm'
                                                : 'bg-white hover:bg-slate-50 text-gray-600 border-slate-200'
                                                }`}
                                        >
                                            <span className='text-xl'>{estilo.icon}</span>
                                            {estilo.nome}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">3. Previsão de Mudança de Cores</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {estilosCabelo.filter(e => e.categoria === 'cor').map((estilo) => (
                                        <button
                                            key={estilo.id}
                                            type="button"
                                            onClick={() => setgeradorselecionado(estilo.id)}
                                            className={`p-2.5 border rounded-xl text-left flex flex-col sm:flex-row items-center gap-2 transition-all text-xs ${geradorselecionado === estilo.id
                                                ? 'border-amber-600 bg-amber-50 font-bold text-amber-900 shadow-sm'
                                                : 'bg-white hover:bg-slate-50 text-gray-600 border-slate-200'
                                                }`}
                                        >
                                            <span className='text-lg'>{estilo.icon}</span>
                                            {estilo.nome.replace('Previsão de Cor: ', '')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={iniciarSimulacao}
                                disabled={carregando}
                                className='w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl shadow hover:opacity-95 transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2 text-sm'
                            >
                                {carregando ? "🔄 Mapeando Vetores e Traços..." : "✨ Processar com Inteligência Artificial"}
                            </button>
                        </div>
                    </div>

                    {/* COLUNA DIREITA: VISUALIZAÇÃO DOS RESULTADOS RENDERIZADOS */}
                    <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 min-h-[460px] lg:min-h-[580px] h-full justify-between'>
                        <h3 className='font-bold text-xs uppercase tracking-wider text-gray-400'>4. Visualização Pronta (Saída Controlada)</h3>

                        <div className='flex-1 flex items-center justify-center h-full mt-2'>
                            {imagemResultado ? (
                                <div className='rounded-lg overflow-hidden border border-emerald-500 shadow-md w-full h-full max-h-[460px] bg-slate-100 flex items-center justify-center'>
                                    <img src={imagemResultado} alt="Saída Definida" className='w-full h-full object-contain max-h-[460px]' />
                                </div>
                            ) : (
                                <div className='w-full h-full min-h-[350px] rounded-lg bg-slate-50 border border-slate-200 border-dashed flex flex-col items-center justify-center text-xs text-gray-400 italic text-center p-6 gap-2'>
                                    {carregando ? "📦 Montando layout e injetando paleta cromática..." : "📋 Selecione uma ação do painel lateral e execute para ver o resultado."}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default AIAssistant;