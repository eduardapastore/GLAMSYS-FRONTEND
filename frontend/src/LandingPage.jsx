import React from 'react'

const LandingPage = () => {
    return (
        <main clasName='w-full min-h-screen overflow-x-hidden'>
            {/* // SECTION1 */}
            <section className='w-full bg-cover bg-center min-h-screen flex flex-col justify-between'
                style={{ backgroundImage: "url('/src/imgs/heroimg.svg')" }}
            >
                <header className='p-2 m-8 flex justify-between text-amber-50 font-semibold'>
                    <ul className='flex gap-4'>
                        <li className='hover:font-black  transition transition-discrete duration-200'><a href='#Inicio'>Início</a></li>
                        <li className='hover:font-black transition transition-discrete duration-200'><a href='#Sobre'>Quem somos?</a></li>
                        <li className='hover:font-black transition transition-discrete duration-200'><a href='#Funcionalidades'>Funcionalidades</a></li>
                    </ul>

                    <div className='flex gap-4 '>
                        <button className='bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition transition-discrete duration-200'>
                            <a href='/cadastroteste'>Teste Grátis</a>
                        </button>
                        <button className='cursor-pointer border-2 border-white text-white px-4 py-2 rounded-full hover:bg-amber-50 hover:text-amber-600 hover:font-bold transition transition-discrete duration-700'>
                            <a href='/login'>Já sou Cliente</a>
                        </button>
                    </div>
                </header>

                {/* hero */}
                <section className='p-8 m-32 text-amber-50'>
                    <img
                        src='/src/imgs/GlamsySlogob.svg'
                        alt='Logo GlamSys'
                        className='mb-4'
                    />
                    <h1 className='text-3xl font-bold'>Transforme a gestão do seu espaço em uma experiência de alto padrão.</h1>
                    <p className='text-lg mb-6'>Deixe de perder tempo com agendas de papel e mensagens intermináveis. Ganhe o controle total do seu salão, barbearia ou clínica de estética com uma plataforma intuitiva que trabalha por você.</p>
                    <div className='flex gap-4 font-semibold'>
                        <button className='cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition transition-discrete duration-200'>
                            <a href='/cadastroteste'>Teste Gráti por 14 Dias</a>
                        </button>
                        <button className='cursor-pointer border-2 border-white text-white px-4 py-2 rounded-full hover:bg-amber-50 hover:text-amber-600 hover:font-bold transition transition-discrete duration-700'>
                            <a href='/'>Agendar Demonstração</a>
                        </button>
                    </div>
                </section>
            </section>

            {/* SECTION 2 */}
            <section id='Sobre' className='p-4 mt-16 m-32 mb-8 text-center'>
                <h2 className='text-4xl font-bold mb-1 text-amber-950'><span className='text-amber-700'>Você foca na beleza,</span> nós focamos na <br /> burocracia!</h2>
                <div className='flex gap-4 justify-center m-16 text-amber-900 font-semibold'>
                    <div>
                        <p className='text-lg text-justify mb-4'>Gerenciar um negócio de estética vai muito além de um bom corte ou uma manicure perfeita. Sabemos que o seu dia a dia é corrido:</p>
                        <div className='text-justify flex gap-2 text-amber-900 items-center mb-3'>
                            <i class="bi bi-calendar-event-fill text-yellow-600 text-4xl"></i>
                            <p className='text-md font-normal'>Agendamentos esquecidos que geram buracos na agenda.</p>
                        </div>
                        <div className='text-justify flex gap-2 text-amber-900 items-center mb-3'>
                            <i class="bi bi-people-fill text-yellow-600 text-4xl"></i>
                            <p className='text-md font-normal'>Dificuldade em calcular comissões de profissionais.</p>
                        </div>
                        <div className='text-justify flex gap-2 text-amber-900 items-center'>
                            <i class="bi bi-archive-fill text-yellow-600 text-4xl"></i>
                            <p className='text-md font-normal'>Falta de controle sobre o estoque de produtos.</p>
                        </div>

                    </div>
                    <img
                        src='/src/imgs/img1.svg'
                        alt='Logo GlamSys'
                        className='w-96'
                    />
                </div>

                {/* DIVISÓRIA */}
                <img
                    src='/src/imgs/divisoria.svg'
                    alt='Divisória'
                    className='w-full h-8 mb-8'
                />

                <h2 className='mb-16 text-4xl font-bold text-amber-950'><span className='text-amber-700'>O GlamSync ajuda</span> todos as empresas de <br /> estética e bem-estar</h2>

                <div className='flex gap-4'>
                    <div>
                        <img
                            src='/src/imgs/emp1.svg'
                            className='w-56'
                        />
                        <div className='flex gap-2'>
                            <i class="bi bi-arrow-return-right text-2xl"></i>
                            <p className='text-lg font-semibold'>Barbearias</p>
                        </div>
                    </div>
                    <div>
                        <img
                            src='/src/imgs/emp2.svg'
                            className='w-56'
                        />
                        <div className='flex gap-2'>
                            <i class="bi bi-arrow-return-right text-2xl"></i>
                            <p className='text-lg font-semibold'>Salões de Beleza</p>
                        </div>
                    </div>
                    <div>
                        <img
                            src='/src/imgs/emp3.svg'
                            className='w-56'
                        />
                        <div className='flex gap-2'>
                            <i class="bi bi-arrow-return-right text-2xl"></i>
                            <p className='text-lg font-semibold'>Manicure</p>
                        </div>
                    </div>
                    <div>
                        <img
                            src='/src/imgs/emp4.svg'
                            className='w-56'
                        />
                        <div className='flex gap-2'>
                            <i class="bi bi-arrow-return-right text-2xl"></i>
                            <p className='text-lg font-semibold'>Clínicas de Estética</p>
                        </div>
                    </div>
                </div>

                <button className='bg-amber-600 shadow-sm text-white p-4 text-xl rounded-full mt-16 hover:bg-amber-700 transition transition-discrete duration-200'>
                    <a className='uppercase font-semibold'>Teste grátis por 14 dias</a>
                </button>
            </section>


            {/* SECTION 3 */}
            <section id='Funcionalidades' className='bg-amber-900 text-center align-middle p-4'>
                <h2 className='mt-16 mb-16 text-4xl font-bold text-amber-50'>Tudo que você precisa em um só lugar!</h2>
                {/* Grid configurado explicitamente para 2 colunas no desktop (gerando as 3 linhas automaticamente para 6 itens) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 md:mx-24 mt-6 text-justify text-md'>

                    {/* Card 1 - Linha 1, Coluna 1 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func1.svg'
                            alt='Agenda Inteligente'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Agenda Inteligente </span>- Visualização clara por agenda intuitiva e exibição dinâmica.</p>
                    </div>

                    {/* Card 2 - Linha 1, Coluna 2 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func2.svg'
                            alt='Lembretes Automáticos'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Lembretes Automáticos </span>- Envio de notificações via WhatsApp para reduzir faltas e enviar promoções.</p>
                    </div>

                    {/* Card 3 - Linha 2, Coluna 1 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func3.svg'
                            alt='Ficha de Anamnese Digital'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Ficha de Anamnese Digital </span>- Recomende procedimentos e serviços baseados nas últimas escolhas do seu cliente.</p>
                    </div>

                    {/* Card 4 - Linha 2, Coluna 2 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func4.svg'
                            alt='Gestão de Estoque e Finanças'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Gestão de Estoque e Finanças </span>- Fluxo de caixa e de estoque, com cálculo automático e exibição para análise.</p>
                    </div>

                    {/* Card 5 - Linha 3, Coluna 1 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func5.svg'
                            alt='Agendamento Online 24h'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Agendamento Online 24h </span>- Seu cliente marca o horário pelo site, sem você precisar digitar uma palavra.</p>
                    </div>

                    {/* Card 6 - Linha 3, Coluna 2 */}
                    <div className='p-5 bg-yellow-600 text-amber-50 rounded-lg flex flex-col justify-between shadow-md'>
                        <img
                            src='/src/imgs/func6.svg'
                            alt='Sistema de Fidelidade'
                            className='w-full h-48 object-contain mb-4 rounded-md bg-yellow-700/30 p-2'
                        />
                        <p><span className='font-bold'>Sistema de Fidelidade</span>- Seu cliente se torna fiel com um sistema de fidelidade com notificações.</p>
                    </div>
                </div>

                {/* DIVISÓRIA */}
                <img
                    src='/src/imgs/divisoria1.svg'
                    alt='Divisória'
                    className='w-full h-8 mb-8 mt-12'
                />

                <div className='flex justify-center items-stretch gap-0 m-56 mt-12 mb-8 rounded-3xl overflow-hidden shadow-lg bg-amber-600'>
                    {/* Imagem direta: w-80 define a largura e h-full força a altura do texto */}
                    <img
                        src='/src/imgs/cta1.svg'
                        alt='ctaimage'
                        className='w-80 h-full object-cover block'
                    />

                    {/* Bloco de Conteúdo (Direita) - Ele é o "piloto" que dita a altura do bloco */}
                    <div className='p-8 text-justify text-amber-50 flex flex-col justify-center flex-1'>
                        <h2 className='text-2xl font-bold mb-3 leading-tight'>
                            Acompanhe tudo em <br /> apenas um lugar!
                        </h2>
                        <p className='text-sm text-amber-100/90'>
                            Junte-se a centenas de profissionais que <br /> recuperaram o controle do seu tempo.
                        </p>

                        <div className='flex justify-start'>
                            <button className='bg-amber-50 px-5 py-2.5 uppercase text-xs font-bold rounded-full mt-6 text-amber-600 shadow-md hover:bg-amber-100 transition-all active:scale-95'>
                                <a href='#'>
                                    Teste Grátis por 14 Dias
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <section className='text-center mt-16 mb-16'>
                <h2 className='mb-16 text-4xl font-bold text-amber-950'><span className='text-amber-700'>Por que escolher</span> GlamSys</h2>

                <div className='flex mb-4 gap-4 justify-center items-center p-4 bg-amber-800 w-11/12 md:w-1/2 mx-auto text-justify text-amber-50 font-semibold rounded-lg shadow-md'>
                    <i className="bi bi-ticket-perforated text-6xl  text-amber-50"></i>

                    <span className="border-l-2 border-amber-50 h-8 self-center"></span>

                    <p className='font-normal flex-1 pl-2'>
                        Sistema de Fidelidade: Um sistema de fidelidade para atrair seus clientes.
                    </p>
                </div>

                <div className=' mb-4 flex gap-4 justify-center items-center p-4 bg-amber-700 w-11/12 md:w-1/2 mx-auto text-justify text-amber-50 font-semibold rounded-lg shadow-md'>
                    <i className="bi bi-person-raised-hand text-6xl text-amber-50"></i>

                    <span className="border-l-2 border-amber-50 h-8 self-center"></span>

                    <p className='font-normal flex-1 pl-2'>
                        Suporte Especializado: Uma equipe que entende as dores do setor de estética pronta para te ajudar.
                    </p>
                </div>

                <div className='flex mb-8 gap-4 justify-center items-center p-4 bg-amber-600 w-11/12 md:w-1/2 mx-auto text-justify text-amber-50 font-semibold rounded-lg shadow-md'>
                    <i className="bi bi-tags text-6xl text-amber-50"></i>

                    <span className="border-l-2 border-amber-50 h-8 self-center"></span>

                    <p className='font-normal flex-1 pl-2'>
                        Análise para Promoções: Saiba qual promoção se encaixa melhor com seus clientes.
                    </p>
                </div>

                <div className='flex justify-center items-stretch gap-0 m-56 mt-12 mb-8 rounded-3xl overflow-hidden shadow-lg bg-amber-600'>
                    <div className='p-8 text-justify text-amber-50 flex flex-col justify-center flex-1'>
                        <h2 className='text-2xl font-bold mb-3 leading-tight'>
                            Pronto para elevar o <br /> nível do seu negócio?
                        </h2>
                        <p className='text-sm text-amber-100/90'>
                            Junte-se a centenas de profissionais que recuperaram o controle do seu tempo.                        </p>

                        <div className='flex justify-start'>
                            <button className='bg-amber-50 px-5 py-2.5 uppercase text-xs font-bold rounded-full mt-6 text-amber-600 shadow-md hover:bg-amber-100 transition-all active:scale-95'>
                                <a href='#'>
                                    Teste Grátis por 14 Dias
                                </a>
                            </button>
                        </div>
                    </div>

                    <img
                        src='/src/imgs/cta2.svg'
                        alt='ctaimage'
                        className='w-80 h-full object-cover block'
                    />
                </div>
            </section>

            <footer className='p-8 bg-amber-800 text-white'>
                <p className='text-center'>
                    &copy; 2026 GlamSys. Todos os direitos reservados.
                </p>
            </footer>
        </main>
    )
}

export default LandingPage