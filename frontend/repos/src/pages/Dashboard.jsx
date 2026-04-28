import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import axios from 'axios';

const Dashboard = () => {
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Evelyn Macedo",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 2,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 3,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 4,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
  ]);
  const [agendamentos, setAgendamentos] = useState([]);
  useEffect(() => {

    //agendamentos
    axios.get('http://localhost:3000/agendamentos/detalhes2')
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
        toast.error("Erro ao carregar os serviços!");
      });

  }, []);

  // gráfico
  const getMonthName = (date) =>
    date.toLocaleString("pt-BR", { month: "short" }).toUpperCase();

  const now = new Date();

  const month0 = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const month1 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month2 = new Date(now.getFullYear(), now.getMonth(), 1);

  const contagemPorMes = {};

  agendamentos.forEach(item => {
    const mes = new Date(item.data).toLocaleString("pt-BR", { month: "short" }).toUpperCase();
    contagemPorMes[mes] = (contagemPorMes[mes] || 0) + 1;
  });

  const data = Object.keys(contagemPorMes).map(mes => ({
    name: mes,
    valor: contagemPorMes[mes]
  }));


  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const formatarHora = (hora) => {
    
    return hora.slice(0, 5);
  };


  return (
    <div className='w-screen flex h-screen'>
      <Navbar />
      <main className='p-6 w-screen h-full'>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        
        
      </main>
    </div>
  )
}

export default Dashboard