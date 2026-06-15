import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null); 
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='w-1/4 h-screen sticky top-0 p-6 border-r border-slate-400 bg-transparent flex flex-col' ref={dropdownRef}>
      
      {/* Perfil do Usuário */}
      <div id='perfildeusuário' className='flex gap-4 items-center'>
        <img 
          src='/src/imgs/pfp.png' 
          className='w-12 h-12 rounded-full object-cover' 
          alt='Profile'
        />
        <div className='flex-1 w-full overflow-hidden'>
          <p className='text-base font-semibold truncate'>Admin</p>
          <p className='text-xs font-light text-gray-500'>Administrador</p>
        </div>
        <Link to='/login' className="text-gray-400 hover:text-black transition-colors flex-shrink-0">
          <i className="bi bi-box-arrow-right text-lg font-semibold"></i>
        </Link>
      </div>

      {/* Navegação do Sistema */}
      <div className='flex flex-col gap-4 flex-1 mt-8 overflow-y-auto pr-1'>

        {/* Assistente IA */}
        <Link to='/assistenteia' className={`flex items-center gap-6 w-full transition-colors text-lg ${
          isActive('/assistenteia') ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
        }`}>
          <i className="bi bi-robot text-xl"></i>
          <p>Assistente IA</p>
        </Link>
        
        {/* Dashboard */}
        <Link to='/dashboard' className={`flex items-center gap-6 w-full transition-colors text-lg ${
          isActive('/dashboard') ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
        }`}>
          <i className="bi bi-columns-gap text-xl"></i>
          <p>Dashboard</p>
        </Link>

        {/* Dropdown: Agendamentos */}
        <div className='relative'>
          <button 
            onClick={() => handleDropdown('agendamentos')}
            className={`flex items-center justify-between w-full transition-colors text-lg ${
              openDropdown === 'agendamentos' || isActive('/agendamentos') ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            <div className='flex items-center gap-6'>
              <i className="bi bi-calendar-event text-xl"></i>
              <p>Agendamentos</p>
            </div>
            <i className={`bi bi-chevron-${openDropdown === 'agendamentos' ? 'up' : 'down'} text-sm`}></i>
          </button>

          <AnimatePresence>
            {openDropdown === 'agendamentos' && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }} 
                className="ml-11 flex flex-col gap-1 border-l-2 border-slate-200 pl-4 mt-2"
              >
                <li>
                  <Link to='/agendamentos' className={`flex gap-2 text-base py-1 transition-colors ${isActive('/agendamentos') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                    <i className="bi bi-calendar-date"></i> Calendário
                  </Link>
                </li>
                <li>
                  <Link to='/confirmacoes' className={`flex gap-2 text-base py-1 transition-colors ${isActive('/confirmacoes') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                    <i className="bi bi-calendar-check"></i> Confirmações
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        
        {/* Dropdown: Colaboradores */}
        <div className='relative'>
          <button 
            onClick={() => handleDropdown('colaboradores')}
            className={`flex items-center justify-between w-full transition-colors text-lg ${
              openDropdown === 'colaboradores' || isActive('/colaboradores') ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            <div className='flex items-center gap-6'>
              <i className="bi bi-person-badge text-xl"></i>
              <p>Colaboradores</p>
            </div>
            <i className={`bi bi-chevron-${openDropdown === 'colaboradores' ? 'up' : 'down'} text-sm`}></i>
          </button>

          <AnimatePresence>
            {openDropdown === 'colaboradores' && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }} 
                className="ml-11 flex flex-col gap-1 border-l-2 border-slate-200 pl-4 mt-2"
              >
                <li>
                  <Link to='/colaboradores' className={`text-gray-500 flex gap-2 hover:text-black text-base py-1 transition-colors ${isActive('/colaboradores') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                    <i className="bi bi-people"></i> Gestão de Equipe
                  </Link>
                </li>
                <li>
                  <Link to='/folhadepagamento' className={`text-gray-500 flex gap-2 hover:text-black text-base py-1 transition-colors ${isActive('/folhadepagamento') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>
                    <i className="bi bi-file-earmark-medical"></i> Folha de Pagamento
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Links Simples */}
        {[
          { path: '/clientes', icon: 'bi-star-fill', label: 'Clientes' },
          { path: '/estoque', icon: 'bi-inboxes', label: 'Estoque' },
          { path: '/financeiro', icon: 'bi-cash', label: 'Financeiro' },
          { path: '/servicos', icon: 'bi-person-workspace', label: 'Serviços' },
        ].map((item) => (
          <Link key={item.path} to={item.path} className={`flex items-center gap-6 w-full transition-colors text-lg ${
            isActive(item.path) ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
          }`}>
            <i className={`bi ${item.icon} text-xl`}></i>
            <p>{item.label}</p>
          </Link>
        ))}

      </div>

      <hr className='w-full border-slate-300 my-6' />

      {/* Rodapé */}
      <div className='flex flex-col gap-6 mt-auto'>
        <Link to='/suporte' className={`flex items-center gap-6 w-full transition-colors ${
          isActive('/suporte') ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
        }`}>
          <i className="bi bi-question-octagon text-lg"></i>
          <p>Suporte</p>
        </Link>

        <div className='flex justify-center pb-2'>
          <img src='/src/imgs/GlamSys.svg' className='w-32 opacity-80' alt='GlamSys Logo' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;