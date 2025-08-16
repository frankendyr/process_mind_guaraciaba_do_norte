import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import MapComponent from './components/MapComponent';
import RealMapComponent from './components/RealMapComponent';
import TransparencyIndicator from './components/TransparencyIndicator';
import SalaSituacional from './components/SalaSituacional';
import ChatBot from './components/ChatBot';
import { unidadesSaudeCompletas, escolasCompletas, dadosAtendimentos2025 } from './data/unidadesCompletas';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('unidades');
  const [isSalaSituacional, setIsSalaSituacional] = useState(false);

  // Se estiver no modo Sala Situacional, renderizar apenas esse componente
  if (isSalaSituacional) {
    return <SalaSituacional onExit={() => setIsSalaSituacional(false)} />;
  }

  // Dados demográficos
  const dadosDemograficos = [
    { ano: 2010, populacao: 37748 },
    { ano: 2022, populacao: 42053 },
    { ano: 2025, populacao: 44000 }
  ];

  // Dados de saúde
  const dadosSaude = [
    { indicador: 'Mortalidade Infantil', valor: 14.2, unidade: 'por 1.000 nascidos vivos' },
    { indicador: 'Internações SUS', valor: 1250, unidade: 'por ano' },
    { indicador: 'Cobertura ESF', valor: 100, unidade: '%' },
    { indicador: 'Atendimentos/mês', valor: 20000, unidade: 'julho/2025' }
  ];

  // Dados socioeconômicos
  const dadosSocioeconomicos = [
    { indicador: 'PIB per capita', valor: 'R$ 16.354', ano: 2021 },
    { indicador: 'IDHM', valor: 0.606, ano: 2010 },
    { indicador: 'Receitas', valor: 'R$ 89.234.000', ano: 2023 },
    { indicador: 'Despesas', valor: 'R$ 85.678.000', ano: 2023 }
  ];

  // Dados de educação
  const dadosEducacao = [
    { indicador: 'IDEB Anos Iniciais', valor: 5.8, ano: 2021 },
    { indicador: 'IDEB Anos Finais', valor: 4.9, ano: 2021 },
    { indicador: 'Matrículas', valor: 6842, ano: 2023 },
    { indicador: 'Docentes', valor: 398, ano: 2023 }
  ];

  // Distribuição de unidades de saúde por tipo
  const distribuicaoSaude = [
    { tipo: 'UBS', quantidade: 16, cor: '#2563eb' },
    { tipo: 'Hospital', quantidade: 1, cor: '#dc2626' },
    { tipo: 'CAPS', quantidade: 1, cor: '#7c3aed' },
    { tipo: 'CEO', quantidade: 1, cor: '#059669' },
    { tipo: 'Centros Especializados', quantidade: 3, cor: '#f59e0b' },
    { tipo: 'Apoio/Regulação', quantidade: 4, cor: '#6b7280' }
  ];

  // Distribuição de escolas por zona
  const distribuicaoEscolas = [
    { zona: 'Urbana', quantidade: 9, cor: '#2563eb' },
    { zona: 'Rural', quantidade: 28, cor: '#059669' }
  ];

  // Dados de atendimentos por mês (estimativa baseada em julho)
  const atendimentosMensais = [
    { mes: 'Jan', atendimentos: 18500 },
    { mes: 'Fev', atendimentos: 17800 },
    { mes: 'Mar', atendimentos: 19200 },
    { mes: 'Abr', atendimentos: 18900 },
    { mes: 'Mai', atendimentos: 19500 },
    { mes: 'Jun', atendimentos: 19800 },
    { mes: 'Jul', atendimentos: 20000 },
    { mes: 'Ago', atendimentos: 19700 },
    { mes: 'Set', atendimentos: 19400 },
    { mes: 'Out', atendimentos: 19900 },
    { mes: 'Nov', atendimentos: 20200 },
    { mes: 'Dez', atendimentos: 20500 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'unidades':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-blue-800">Total de Unidades</h3>
                  <TransparencyIndicator type="real" source="CNES" />
                </div>
                <p className="text-3xl font-bold text-blue-600">26</p>
                <p className="text-sm text-blue-600">Estabelecimentos de saúde</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-green-800">UBS Ativas</h3>
                  <TransparencyIndicator type="real" source="CNES" />
                </div>
                <p className="text-3xl font-bold text-green-600">16</p>
                <p className="text-sm text-green-600">Unidades Básicas de Saúde</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-red-800">Hospital</h3>
                  <TransparencyIndicator type="real" source="CNES" />
                </div>
                <p className="text-3xl font-bold text-red-600">1</p>
                <p className="text-sm text-red-600">Hospital e Maternidade</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-800">Atendimentos/Mês</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-3xl font-bold text-purple-600">20.000+</p>
                <p className="text-sm text-purple-600">Julho 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Distribuição por Tipo</h3>
                  <TransparencyIndicator type="real" source="CNES" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distribuicaoSaude}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ tipo, quantidade }) => `${tipo}: ${quantidade}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantidade"
                    >
                      {distribuicaoSaude.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Atendimentos por Tipo (Julho 2025)</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.entries(dadosAtendimentos2025.julho.porTipo).map(([tipo, valor]) => ({ tipo, valor }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Atendimentos']} />
                    <Bar dataKey="valor" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Mapa das Unidades de Saúde</h3>
                <TransparencyIndicator type="real" source="CNES" />
              </div>
              <RealMapComponent unidades={unidadesSaudeCompletas} tipo="saude" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Lista Completa das Unidades de Saúde</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Nome</th>
                      <th className="px-4 py-2 text-left">Tipo</th>
                      <th className="px-4 py-2 text-left">Endereço</th>
                      <th className="px-4 py-2 text-left">Zona</th>
                      <th className="px-4 py-2 text-left">Contato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidadesSaudeCompletas.map((unidade, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{unidade.nome}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            unidade.tipo === 'Hospital' ? 'bg-red-100 text-red-800' :
                            unidade.tipo === 'UBS' ? 'bg-blue-100 text-blue-800' :
                            unidade.tipo === 'CAPS' ? 'bg-purple-100 text-purple-800' :
                            unidade.tipo === 'CEO' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {unidade.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{unidade.endereco}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            unidade.zona === 'urbana' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {unidade.zona === 'urbana' ? 'Urbana' : 'Rural'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {unidade.telefone && <div>{unidade.telefone}</div>}
                          {unidade.email && <div className="text-blue-600">{unidade.email}</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'demografia':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-blue-800">População 2025</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-3xl font-bold text-blue-600">44.000</p>
                <p className="text-sm text-blue-600">Estimativa</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-green-800">Densidade</h3>
                  <TransparencyIndicator type="ibge" />
                </div>
                <p className="text-3xl font-bold text-green-600">69,1</p>
                <p className="text-sm text-green-600">hab/km²</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-800">Área</h3>
                  <TransparencyIndicator type="ibge" />
                </div>
                <p className="text-3xl font-bold text-purple-600">637,7</p>
                <p className="text-sm text-purple-600">km²</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Evolução Populacional</h3>
                <TransparencyIndicator type="ibge" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosDemograficos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'População']} />
                  <Line type="monotone" dataKey="populacao" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'saude':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Mortalidade Infantil</h3>
                  <TransparencyIndicator type="ibge" />
                </div>
                <p className="text-2xl font-bold text-blue-600">14.2</p>
                <p className="text-xs text-gray-500">por 1.000 nascidos vivos</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Internações SUS</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-2xl font-bold text-blue-600">1250</p>
                <p className="text-xs text-gray-500">por ano</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Cobertura ESF</h3>
                  <TransparencyIndicator type="real" source="CNES" />
                </div>
                <p className="text-2xl font-bold text-blue-600">100</p>
                <p className="text-xs text-gray-500">%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Atendimentos/mês</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-2xl font-bold text-blue-600">20000</p>
                <p className="text-xs text-gray-500">julho/2025</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Evolução dos Atendimentos 2025</h3>
                <TransparencyIndicator type="estimativa" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={atendimentosMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Atendimentos']} />
                  <Line type="monotone" dataKey="atendimentos" stroke="#059669" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Dados Atuais de Saúde - 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Lista de Espera de Atendimentos</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Sistema organizado para priorizar o acesso aos serviços de saúde, considerando:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Gravidade do caso</li>
                    <li>Tempo de espera</li>
                    <li>Disponibilidade de vagas</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-50 rounded">
                    <p className="text-sm"><strong>Documento:</strong> Lista de Espera 2025</p>
                    <p className="text-sm"><strong>Última atualização:</strong> 01/01/2025</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Volume de Atendimentos</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded">
                      <p className="font-medium text-green-800">Julho 2025</p>
                      <p className="text-2xl font-bold text-green-600">20.000+</p>
                      <p className="text-sm text-green-600">Atendimentos realizados</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="font-medium text-blue-800">Estimativa Anual</p>
                      <p className="text-2xl font-bold text-blue-600">240.000</p>
                      <p className="text-sm text-blue-600">Crescimento de 5% vs 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Observações sobre Dados de Internações</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Limitações dos Dados Públicos</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Dados específicos de internações e atendimentos detalhados por unidade requerem acesso aos sistemas oficiais (SISAB, e-SUS AB) que possuem acesso restrito para gestores municipais.
                </p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Para obter dados específicos, contate:</strong></p>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm"><strong>Secretaria Municipal de Saúde</strong></p>
                    <p className="text-sm">📞 (88) 3652-2025</p>
                    <p className="text-sm">📧 saude@guaraciabadonorte.ce.gov.br</p>
                    <p className="text-sm">📍 Rua Monsenhor Furtado - Centro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'socioeconomico':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">PIB per capita</h3>
                  <TransparencyIndicator type="ibge" />
                </div>
                <p className="text-2xl font-bold text-green-600">R$ 16.354</p>
                <p className="text-xs text-gray-500">2021</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">IDHM</h3>
                  <TransparencyIndicator type="ibge" />
                </div>
                <p className="text-2xl font-bold text-green-600">0.606</p>
                <p className="text-xs text-gray-500">2010</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Receitas</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-2xl font-bold text-green-600">R$ 89.234.000</p>
                <p className="text-xs text-gray-500">2023</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Despesas</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-2xl font-bold text-green-600">R$ 85.678.000</p>
                <p className="text-xs text-gray-500">2023</p>
              </div>
            </div>
          </div>
        );

      case 'educacao':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">IDEB Anos Iniciais</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <p className="text-2xl font-bold text-purple-600">5.8</p>
                <p className="text-xs text-gray-500">2021</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">IDEB Anos Finais</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <p className="text-2xl font-bold text-purple-600">4.9</p>
                <p className="text-xs text-gray-500">2021</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Matrículas</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <p className="text-2xl font-bold text-purple-600">6842</p>
                <p className="text-xs text-gray-500">2023</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Docentes</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <p className="text-2xl font-bold text-purple-600">398</p>
                <p className="text-xs text-gray-500">2023</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Distribuição por Zona</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distribuicaoEscolas}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ zona, quantidade }) => `${zona}: ${quantidade}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantidade"
                    >
                      {distribuicaoEscolas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Resumo da Rede</h3>
                  <TransparencyIndicator type="real" source="INEP" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Total de Escolas</h4>
                    <p className="text-3xl font-bold text-blue-600">37</p>
                    <p className="text-sm text-blue-600">Unidades educacionais</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Zona Rural</h4>
                    <p className="text-3xl font-bold text-green-600">28</p>
                    <p className="text-sm text-green-600">75,7% das escolas</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Zona Urbana</h4>
                    <p className="text-3xl font-bold text-purple-600">9</p>
                    <p className="text-sm text-purple-600">24,3% das escolas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Mapa das Escolas</h3>
                <TransparencyIndicator type="real" source="INEP" />
              </div>
              <RealMapComponent unidades={escolasCompletas} tipo="educacao" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Lista Completa das Escolas</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Nome</th>
                      <th className="px-4 py-2 text-left">Código INEP</th>
                      <th className="px-4 py-2 text-left">Tipo</th>
                      <th className="px-4 py-2 text-left">Endereço</th>
                      <th className="px-4 py-2 text-left">Zona</th>
                      <th className="px-4 py-2 text-left">Modalidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {escolasCompletas.map((escola, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{escola.nome}</td>
                        <td className="px-4 py-2 text-sm font-mono">{escola.codigo}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            escola.tipo === 'Ensino Fundamental' ? 'bg-blue-100 text-blue-800' :
                            escola.tipo === 'Educação Infantil' ? 'bg-red-100 text-red-800' :
                            escola.tipo === 'Educação de Jovens e Adultos' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {escola.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{escola.endereco}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            escola.zona === 'urbana' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {escola.zona === 'urbana' ? 'Urbana' : 'Rural'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {escola.modalidades && escola.modalidades.map((modalidade, idx) => (
                            <div key={idx} className="text-xs text-gray-600">{modalidade}</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Contato da Secretaria de Educação</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Informações de Contato</h4>
                    <p className="text-sm">📞 (88) 3652-2349</p>
                    <p className="text-sm">📧 educacao@guaraciabadonorte.ce.gov.br</p>
                    <p className="text-sm">📍 Rua Monsenhor Furtado - Centro</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Horário de Funcionamento</h4>
                    <p className="text-sm">Segunda a Sexta-feira</p>
                    <p className="text-sm">08:00h às 14:00h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'seguranca':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-blue-800">Estrutura de Segurança</h3>
                  <TransparencyIndicator type="real" source="SSPDS" />
                </div>
                <p className="text-3xl font-bold text-blue-600">4</p>
                <p className="text-sm text-blue-600">Órgãos de segurança</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-green-800">Taxa CVLI</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-3xl font-bold text-green-600">8,2</p>
                <p className="text-sm text-green-600">por 100 mil hab</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-yellow-800">Tempo Resposta</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-3xl font-bold text-yellow-600">12</p>
                <p className="text-sm text-yellow-600">minutos (média)</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-800">Cobertura</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <p className="text-3xl font-bold text-purple-600">65%</p>
                <p className="text-sm text-purple-600">área monitorada</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Ocorrências por Tipo</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { tipo: 'Furtos', quantidade: 45, cor: '#3b82f6' },
                        { tipo: 'Roubos', quantidade: 18, cor: '#ef4444' },
                        { tipo: 'Lesões', quantidade: 12, cor: '#f59e0b' },
                        { tipo: 'Ameaças', quantidade: 8, cor: '#8b5cf6' },
                        { tipo: 'Outros', quantidade: 7, cor: '#6b7280' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ tipo, quantidade }) => `${tipo}: ${quantidade}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantidade"
                    >
                      {[
                        { tipo: 'Furtos', quantidade: 45, cor: '#3b82f6' },
                        { tipo: 'Roubos', quantidade: 18, cor: '#ef4444' },
                        { tipo: 'Lesões', quantidade: 12, cor: '#f59e0b' },
                        { tipo: 'Ameaças', quantidade: 8, cor: '#8b5cf6' },
                        { tipo: 'Outros', quantidade: 7, cor: '#6b7280' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Evolução Mensal 2025</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { mes: 'Jan', ocorrencias: 95 },
                    { mes: 'Fev', ocorrencias: 88 },
                    { mes: 'Mar', ocorrencias: 92 },
                    { mes: 'Abr', ocorrencias: 85 },
                    { mes: 'Mai', ocorrencias: 78 },
                    { mes: 'Jun', ocorrencias: 82 },
                    { mes: 'Jul', ocorrencias: 90 },
                    { mes: 'Ago', ocorrencias: 85 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ocorrencias" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Estrutura de Segurança</h3>
                  <TransparencyIndicator type="real" source="SSPDS" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-blue-800">Delegacia de Polícia Civil</h4>
                      <p className="text-sm text-blue-600">AIS 14 - Rua Laurentino de...</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Ativa</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-green-800">Destacamento PM/PC</h4>
                      <p className="text-sm text-green-600">Av. Tenente Matias, 131-173</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Ativa</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-purple-800">Central de Videomonitoramento</h4>
                      <p className="text-sm text-purple-600">50ª do Estado - CPRAIO</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Ativa</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-orange-800">Sec. Segurança e Trânsito</h4>
                      <p className="text-sm text-orange-600">Chagas Marinho Neto (Secretário)</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Ativa</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Indicadores de Performance</h3>
                  <TransparencyIndicator type="estimativa" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa de Resolução</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-green-600 font-semibold">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Efetivo PM</span>
                    <span className="font-semibold">~25 policiais</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Efetivo PC</span>
                    <span className="font-semibold">~8 policiais</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Viaturas Ativas</span>
                    <span className="font-semibold">6 unidades</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Câmeras Monitoramento</span>
                    <span className="font-semibold">~40 unidades</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-xl font-semibold mb-4">Canais de Denúncia e Emergência</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Emergências</h4>
                  <p className="text-sm">🚨 PM: 190</p>
                  <p className="text-sm">🚨 PC: 197</p>
                  <p className="text-sm">🚨 Bombeiros: 193</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Polícia Civil Guaraciaba</h4>
                  <p className="text-sm">📞 (88) 3652-2001</p>
                  <p className="text-sm">📱 WhatsApp: (88) 99964-5753</p>
                  <p className="text-sm">📧 1dpguaraciabadonorte@pc.ce.gov.br</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Horário de Atendimento</h4>
                  <p className="text-sm">Segunda a Sexta-feira</p>
                  <p className="text-sm">08:00h às 12:00h</p>
                  <p className="text-sm">13:00h às 18:00h</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Importante:</strong> Para denúncias anônimas, use o WhatsApp da Polícia Civil. 
                  Sua identidade será preservada conforme garantido pela legislação.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel de BI - Guaraciaba do Norte</h1>
            <p className="text-blue-100 mt-2">Indicadores de Saúde, Educação e Desenvolvimento Municipal</p>
          </div>
          <button
            onClick={() => setIsSalaSituacional(true)}
            className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🖥️ Sala Situacional
          </button>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'unidades', label: 'Unidades de Saúde' },
              { id: 'demografia', label: 'Demografia' },
              { id: 'saude', label: 'Saúde' },
              { id: 'socioeconomico', label: 'Socioeconômico' },
              { id: 'educacao', label: 'Educação' },
              { id: 'seguranca', label: 'Segurança Pública' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
      </main>

      {/* ChatBot - apenas nas seções do dashboard, não na Sala Situacional */}
      <ChatBot currentSection={activeTab} />

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            Painel de Business Intelligence - Guaraciaba do Norte/CE
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Dados atualizados em agosto de 2025 | Fontes: IBGE, DATASUS, Prefeitura Municipal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

