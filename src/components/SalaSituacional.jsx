import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import OpenStreetMapComponent from './OpenStreetMapComponent';
import CustomPieChart from './CustomPieChart';
import { unidadesSaudeCompletas, escolasCompletas, dadosAtendimentos2025 } from '../data/unidadesCompletas';

const SalaSituacional = ({ onExit }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeScreen, setActiveScreen] = useState(0);

  // Atualizar relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dados de comparação mensal 2025
  const comparacaoMensal2025 = [
    { mes: 'Jan', atendimentos: 18500, meta: 19000, variacao: -2.6 },
    { mes: 'Fev', atendimentos: 17800, meta: 19000, variacao: -6.3 },
    { mes: 'Mar', atendimentos: 19200, meta: 19000, variacao: 1.1 },
    { mes: 'Abr', atendimentos: 18900, meta: 19000, variacao: -0.5 },
    { mes: 'Mai', atendimentos: 19500, meta: 19000, variacao: 2.6 },
    { mes: 'Jun', atendimentos: 19800, meta: 19000, variacao: 4.2 },
    { mes: 'Jul', atendimentos: 20000, meta: 19000, variacao: 5.3 },
    { mes: 'Ago', atendimentos: 19700, meta: 19000, variacao: 3.7 }
  ];

  // Dados de atendimentos por unidade (julho 2025)
  const atendimentosPorUnidade = [
    { unidade: 'Hospital São José', atendimentos: 8500, capacidade: 9000, ocupacao: 94.4 },
    { unidade: 'Centro de Saúde', atendimentos: 4200, capacidade: 4500, ocupacao: 93.3 },
    { unidade: 'UBS Lagoinha', atendimentos: 850, capacidade: 900, ocupacao: 94.4 },
    { unidade: 'UBS Martinslândia', atendimentos: 750, capacidade: 800, ocupacao: 93.8 },
    { unidade: 'UBS Morrinhos', atendimentos: 680, capacidade: 750, ocupacao: 90.7 },
    { unidade: 'CAPS', atendimentos: 320, capacidade: 400, ocupacao: 80.0 },
    { unidade: 'CEO', atendimentos: 450, capacidade: 500, ocupacao: 90.0 }
  ];

  // Indicadores em tempo real (simulados)
  const indicadoresTempoReal = {
    atendimentosHoje: 847,
    pacientesAguardando: 23,
    leitos: { ocupados: 18, total: 24, taxa: 75 },
    ambulancias: { ativas: 2, total: 3 },
    emergencias: 5
  };

  // Distribuição de atendimentos por especialidade
  const atendimentosPorEspecialidade = [
    { especialidade: 'Clínica Geral', quantidade: 8500, cor: '#2563eb' },
    { especialidade: 'Pediatria', quantidade: 3200, cor: '#dc2626' },
    { especialidade: 'Ginecologia', quantidade: 2800, cor: '#059669' },
    { especialidade: 'Odontologia', quantidade: 2100, cor: '#7c3aed' },
    { especialidade: 'Psicologia', quantidade: 1800, cor: '#f59e0b' },
    { especialidade: 'Fisioterapia', quantidade: 1600, cor: '#6b7280' }
  ];

  // Configuração das telas
  const telas = [
    {
      id: 0,
      titulo: "Visão Geral - Indicadores Principais",
      componente: (
        <div className="grid grid-cols-4 gap-6 h-full">
          {/* Coluna 1 - KPIs Principais */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">População Total</h3>
                <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  ESTIMATIVA
                </span>
              </div>
              <p className="text-4xl font-bold">44.000</p>
              <p className="text-blue-100">Estimativa 2025</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Unidades de Saúde</h3>
                <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  ✓ REAL
                </span>
              </div>
              <p className="text-4xl font-bold">26</p>
              <p className="text-green-100">Estabelecimentos</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Escolas</h3>
                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                  ✓ REAL
                </span>
              </div>
              <p className="text-4xl font-bold">37</p>
              <p className="text-purple-100">Unidades educacionais</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">PIB per capita</h3>
                <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  ✓ IBGE
                </span>
              </div>
              <p className="text-4xl font-bold">R$ 16.354</p>
              <p className="text-orange-100">Ano 2021</p>
            </div>
          </div>

          {/* Coluna 2 - Gráfico de Evolução */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">Evolução dos Atendimentos 2025</h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                📊 ESTIMATIVA
              </span>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={comparacaoMensal2025}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" tick={{ fill: '#374151', fontSize: 12 }} />
                <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [value.toLocaleString(), 'Atendimentos']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                />
                <Area type="monotone" dataKey="atendimentos" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} strokeWidth={3} />
                <Area type="monotone" dataKey="meta" stroke="#dc2626" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Coluna 3 - Distribuição por Tipo */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <CustomPieChart 
              data={atendimentosPorEspecialidade} 
              title="Atendimentos por Especialidade" 
              isEstimated={true}
            />
          </div>

          {/* Coluna 4 - Indicadores em Tempo Real */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-800">Tempo Real</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  SIMULADO
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Atendimentos Hoje</span>
                  <span className="text-2xl font-bold text-blue-600">{indicadoresTempoReal.atendimentosHoje}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Aguardando</span>
                  <span className="text-2xl font-bold text-orange-600">{indicadoresTempoReal.pacientesAguardando}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Emergências</span>
                  <span className="text-2xl font-bold text-red-600">{indicadoresTempoReal.emergencias}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-800">Capacidade</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  SIMULADO
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-700">
                    <span>Leitos</span>
                    <span>{indicadoresTempoReal.leitos.ocupados}/{indicadoresTempoReal.leitos.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${indicadoresTempoReal.leitos.taxa}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{indicadoresTempoReal.leitos.taxa}% ocupação</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-700">
                    <span>Ambulâncias</span>
                    <span>{indicadoresTempoReal.ambulancias.ativas}/{indicadoresTempoReal.ambulancias.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(indicadoresTempoReal.ambulancias.ativas / indicadoresTempoReal.ambulancias.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{Math.round((indicadoresTempoReal.ambulancias.ativas / indicadoresTempoReal.ambulancias.total) * 100)}% ativas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3">Performance Julho</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">+5.3%</div>
                <div className="text-sm text-gray-600">vs Meta</div>
                <div className="text-xs text-gray-500 mt-2">20.000 atendimentos</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      titulo: "Comparação Mensal 2025 - Análise de Performance",
      componente: (
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Gráfico Principal */}
          <div className="col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Atendimentos vs Meta - 2025</h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                📊 ESTIMATIVA
              </span>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={comparacaoMensal2025}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" tick={{ fill: '#374151', fontSize: 12 }} />
                <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    value.toLocaleString(), 
                    name === 'atendimentos' ? 'Atendimentos' : 'Meta'
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                />
                <Bar dataKey="atendimentos" fill="#2563eb" name="atendimentos" stroke="#1d4ed8" strokeWidth={1} />
                <Bar dataKey="meta" fill="#dc2626" name="meta" opacity={0.7} stroke="#b91c1c" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Análise Lateral */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Resumo do Período</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">156.400</div>
                  <div className="text-sm text-green-700">Total de Atendimentos</div>
                  <div className="text-xs text-gray-500">Jan - Ago 2025</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">19.550</div>
                  <div className="text-sm text-blue-700">Média Mensal</div>
                  <div className="text-xs text-gray-500">8 meses</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">+0.8%</div>
                  <div className="text-sm text-orange-700">Crescimento Médio</div>
                  <div className="text-xs text-gray-500">vs Meta</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Variação Mensal</h3>
              <div className="space-y-3">
                {comparacaoMensal2025.slice(-4).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.mes}</span>
                    <span className={`font-bold ${item.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variacao >= 0 ? '+' : ''}{item.variacao}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Projeção</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">240.000</div>
                <div className="text-sm text-gray-600">Estimativa Anual</div>
                <div className="text-xs text-gray-500 mt-2">Baseada na tendência atual</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      titulo: "Mapa Geográfico - Distribuição das Unidades",
      componente: (
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Mapa das Unidades de Saúde */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Unidades de Saúde</h3>
            <OpenStreetMapComponent unidades={unidadesSaudeCompletas} tipo="saude" />
          </div>

          {/* Mapa das Escolas */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Escolas Municipais</h3>
            <OpenStreetMapComponent unidades={escolasCompletas} tipo="educacao" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      titulo: "Performance por Unidade - Julho 2025",
      componente: (
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Gráfico de Performance */}
          <div className="col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Atendimentos por Unidade</h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                📊 ESTIMATIVA
              </span>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={atendimentosPorUnidade}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="unidade" tick={{ fill: '#374151', fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [value.toLocaleString(), 'Atendimentos']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    color: '#374151'
                  }}
                />
                <Bar dataKey="atendimentos" fill="#2563eb" stroke="#1d4ed8" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ranking e Métricas */}
          <div className="space-y-4">
            {/* Cards individuais por unidade */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Indicadores por Unidade</h3>
              <div className="space-y-3">
                {atendimentosPorUnidade.slice(0, 5).map((unidade, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-gray-800 mb-1">{unidade.unidade}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">{unidade.atendimentos.toLocaleString()} atendimentos</div>
                      <div className={`text-sm font-bold ${unidade.ocupacao >= 90 ? 'text-red-600' : 'text-green-600'}`}>
                        {unidade.ocupacao}% ocupação
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Alertas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800">Alta Ocupação</div>
                  <div className="text-xs text-red-600">Hospital São José - 94.4%</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">Capacidade Limite</div>
                  <div className="text-xs text-yellow-600">UBS Lagoinha - 94.4%</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Capacidade OK</div>
                  <div className="text-xs text-green-600">CAPS - 80.0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      titulo: "Segurança Pública - Centro de Comando",
      componente: (
        <div className="grid grid-cols-4 gap-6 h-full">
          {/* Coluna 1 - Status Operacional */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Ocorrências Hoje</h3>
                <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  🔄 SIMULADO
                </span>
              </div>
              <p className="text-3xl font-bold">7</p>
              <p className="text-red-100">Em andamento: 2</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Viaturas Ativas</h3>
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  🔄 SIMULADO
                </span>
              </div>
              <p className="text-3xl font-bold">4/6</p>
              <p className="text-blue-100">2 em patrulhamento</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Tempo Resposta</h3>
                <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  📊 ESTIMATIVA
                </span>
              </div>
              <p className="text-3xl font-bold">8min</p>
              <p className="text-green-100">Média hoje</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Câmeras Online</h3>
                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                  🔄 SIMULADO
                </span>
              </div>
              <p className="text-3xl font-bold">38/40</p>
              <p className="text-purple-100">95% operacional</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Status das Equipes</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm font-medium text-green-800">Viatura 01</span>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Patrulha</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm font-medium text-red-800">Viatura 02</span>
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Ocorrência</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium text-blue-800">Viatura 03</span>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Disponível</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-sm font-medium text-yellow-800">Viatura 04</span>
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Manutenção</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Mapa de Ocorrências */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">Mapa de Ocorrências - Tempo Real</h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                🔄 SIMULADO
              </span>
            </div>
            
            {/* Mapa Real de Ocorrências */}
            <div className="h-80 rounded-lg overflow-hidden border-2 border-gray-300 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63439.89!2d-40.7500!3d-4.1667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGuaraciaba%20do%20Norte%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Guaraciaba do Norte"
              ></iframe>
              
              {/* Overlay com pontos de ocorrência */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Pontos de ocorrência simulados */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white pointer-events-auto">
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full opacity-30 animate-ping"></div>
                  <div className="absolute top-6 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Perturbação - Centro
                  </div>
                </div>
                
                <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg border-2 border-white pointer-events-auto">
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-500 rounded-full opacity-30 animate-ping"></div>
                  <div className="absolute top-6 right-0 bg-yellow-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Furto - Lagoinha
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white pointer-events-auto">
                  <div className="absolute top-6 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Resolvida - Morrinhos
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-white pointer-events-auto">
                  <div className="absolute top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Patrulha - Martinslândia
                  </div>
                </div>
              </div>
              
              {/* Legenda sobreposta */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Ocorrência Ativa</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Em Atendimento</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Resolvida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Patrulha</span>
                </div>
              </div>
              
              {/* Título sobreposto */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
                <h4 className="text-sm font-semibold">Central de Videomonitoramento</h4>
                <p className="text-xs text-gray-300">Guaraciaba do Norte - Cobertura em Tempo Real</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
              <div className="bg-red-50 p-2 rounded text-center">
                <div className="font-bold text-red-600">2</div>
                <div className="text-red-600">Ativas</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center">
                <div className="font-bold text-yellow-600">3</div>
                <div className="text-yellow-600">Em Atendimento</div>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <div className="font-bold text-green-600">12</div>
                <div className="text-green-600">Resolvidas Hoje</div>
              </div>
              <div className="bg-blue-50 p-2 rounded text-center">
                <div className="font-bold text-blue-600">4</div>
                <div className="text-blue-600">Patrulhas</div>
              </div>
            </div>
          </div>

          {/* Coluna 3 - Gráficos de Performance */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Ocorrências por Hora</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  🔄 SIMULADO
                </span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { hora: '06h', ocorrencias: 1 },
                  { hora: '08h', ocorrencias: 2 },
                  { hora: '10h', ocorrencias: 0 },
                  { hora: '12h', ocorrencias: 3 },
                  { hora: '14h', ocorrencias: 1 },
                  { hora: '16h', ocorrencias: 2 },
                  { hora: '18h', ocorrencias: 4 },
                  { hora: '20h', ocorrencias: 1 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hora" tick={{ fill: '#374151', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} />
                  <Tooltip 
                    formatter={(value) => [value, 'Ocorrências']}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      color: '#374151'
                    }}
                  />
                  <Bar dataKey="ocorrencias" fill="#dc2626" stroke="#b91c1c" strokeWidth={1} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Tipos de Ocorrência</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  🔄 SIMULADO
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Perturbação</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm font-bold text-blue-600">3</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Furto</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-sm font-bold text-red-600">2</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Acidente</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">1</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Outros</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4 - Alertas e Comunicações */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Alertas Ativos</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-red-800">Ocorrência Prioritária</div>
                      <div className="text-xs text-red-600">Centro - Rua Monsenhor Furtado</div>
                      <div className="text-xs text-red-500">Há 12 minutos</div>
                    </div>
                    <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded">ALTA</span>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-yellow-800">Viatura em Manutenção</div>
                      <div className="text-xs text-yellow-600">Viatura 04 - Problema elétrico</div>
                      <div className="text-xs text-yellow-500">Há 2 horas</div>
                    </div>
                    <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">MÉDIA</span>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-blue-800">Câmera Offline</div>
                      <div className="text-xs text-blue-600">Câmera 15 - Praça Central</div>
                      <div className="text-xs text-blue-500">Há 45 minutos</div>
                    </div>
                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">BAIXA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Comunicações</h3>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-800">17:45 - Central para Viatura 02</div>
                  <div className="text-gray-600">"Dirija-se para Rua das Flores, 123"</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-800">17:42 - Viatura 01 para Central</div>
                  <div className="text-gray-600">"Ocorrência resolvida, retornando"</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-800">17:38 - Central para Viatura 03</div>
                  <div className="text-gray-600">"Patrulhamento setor Norte"</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Contatos de Emergência</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="font-medium text-red-800">PM - Emergência</span>
                  <span className="text-red-600">190</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="font-medium text-blue-800">PC - Delegacia</span>
                  <span className="text-blue-600">(88) 3652-2001</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="font-medium text-green-800">Bombeiros</span>
                  <span className="text-green-600">193</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="font-medium text-purple-800">Sec. Segurança</span>
                  <span className="text-purple-600">Chagas Marinho</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-rotação das telas (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % telas.length);
    }, 30000); // Muda a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header da Sala Situacional */}
      <div className="bg-blue-900 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">SALA SITUACIONAL - GUARACIABA DO NORTE</h1>
          <p className="text-blue-200">Sistema de Monitoramento em Tempo Real</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xl font-mono">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-blue-200">{currentTime.toLocaleDateString()}</div>
          </div>
          <button
            onClick={onExit}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>

      {/* Navegação das Telas */}
      <div className="bg-gray-800 p-4">
        <div className="flex space-x-4">
          {telas.map((tela, index) => (
            <button
              key={tela.id}
              onClick={() => setActiveScreen(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeScreen === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tela {index + 1}: {tela.titulo.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da Tela Ativa */}
      <div className="p-6 h-[calc(100vh-140px)]">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-100">{telas[activeScreen].titulo}</h2>
        </div>
        <div className="h-full">
          {telas[activeScreen].componente}
        </div>
      </div>

      {/* Footer com Status */}
      <div className="bg-gray-800 p-3 text-center text-sm text-gray-400">
        <div className="flex justify-center items-center space-x-6">
          <span>Sistema Online • Última atualização: {currentTime.toLocaleTimeString()}</span>
          <span>Tela {activeScreen + 1} de {telas.length}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded mr-2">✓ REAL</span>
          Dados oficiais (IBGE, Cadastros) • 
          <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded mx-2">📊 ESTIMATIVA</span>
          Dados simulados baseados em padrões regionais
        </div>
      </div>
    </div>
  );
};

export default SalaSituacional;

