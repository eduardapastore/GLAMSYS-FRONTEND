import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '/firebase.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', erro: false });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const loginComEmail = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setMensagem({ texto: 'Preencha todos os campos.', erro: true });
      return;
    }

    setCarregando(true);
    setMensagem({ texto: '', erro: false });

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      setMensagem({ texto: 'Login realizado com sucesso! Redirecionando...', erro: false });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (erro) {
      console.error(erro);
      let msgErro = 'Erro ao realizar login. Verifique as credenciais.';
      if (erro.code === 'auth/invalid-credential') msgErro = 'E-mail ou senha incorretos.';
      if (erro.code === 'auth/invalid-email') msgErro = 'Formato de e-mail inválido.';
      
      setMensagem({ texto: msgErro, erro: true });
    } finally {
      setCarregando(false);
    }
  };

  const loginComGoogle = async () => {
    setCarregando(true);
    setMensagem({ texto: '', erro: false });
    
    try {
      const resultado = await signInWithPopup(auth, googleProvider);
      setMensagem({ texto: 'Autenticado com o Google! Entrando...', erro: false });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (erro) {
      console.error(erro);
      if (erro.code !== 'auth/popup-closed-by-user') {
        setMensagem({ texto: 'Erro ao autenticar com o Google.', erro: true });
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full overflow-hidden font-sans'>
      <div 
        className="hidden md:block md:w-1/2 min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/src/imgs/signimg.png')" }}
      >
        <div className="absolute inset-0"></div>
      </div>

      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-16'>
        
        <div className='w-full max-w-md space-y-8 flex flex-col items-center'>
          
          <img src='src/imgs/GlamSys.svg' className="w-56 h-auto drop-shadow-md mb-2" alt="Logo GlamSys" />
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-amber-600">Bem-vindo de volta</h2>
            <p className="text-xs text-slate-400">Acesse sua conta para gerenciar seu espaço de alto padrão</p>
          </div>

          <form onSubmit={loginComEmail} className='w-full space-y-4'>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 ml-1">E-mail corporativo</label>
              <input 
                type='email'
                placeholder='exemplo@glamsys.com'
                className='w-full p-3.5 rounded-xl border border-slate-500 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-slate-500">Senha de acesso</label>
                <a href='#' className='font-medium text-amber-500 hover:text-amber-400 text-xs transition-colors'>
                  Esqueceu a senha?
                </a>
              </div>
              <input 
                type='password'
                placeholder='••••••••'
                className='w-full p-3.5 rounded-xl border border-slate-500 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
              />
            </div>

            <button 
              type="submit"
              disabled={carregando}
              className='w-full bg-amber-600 hover:bg-amber-700 text-slate-50 uppercase font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.99] shadow-lg shadow-amber-600/10 text-sm mt-2 flex justify-center items-center'
            >
              {carregando ? (
                <span className="w-5 h-5 border-t-transparent rounded-full animate-spin"></span>
              ) : "Login"}
            </button>
          </form>

          <div className="w-full flex items-center justify-between my-2 text-slate-600 text-xs uppercase tracking-wider font-semibold">
            <span className="h-px bg-slate-800 flex-1"></span>
            <span className="px-3">ou continue com</span>
            <span className="h-px bg-slate-800 flex-1"></span>
          </div>

          <button 
            type="button"
            onClick={loginComGoogle}
            disabled={carregando}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-slate-900 hover:bg-slate-850 text-slate-200 font-medium py-3 px-4 rounded-xl border border-slate-800 transition-all active:scale-[0.99] text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.29 1.414 15.56 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.79-.085-1.39-.189-1.905H12.24z"/>
            </svg>
            Entrar com a conta Google
          </button>

          {mensagem.texto && (
            <div className={`w-full p-3 rounded-xl text-center text-xs font-semibold tracking-wide transition-all ${
              mensagem.erro ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {mensagem.texto}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;