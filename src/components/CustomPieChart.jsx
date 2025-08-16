import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomPieChart = ({ data, title, isEstimated = false }) => {
  // Função para renderizar labels customizados
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, especialidade }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Só mostra o label se a porcentagem for maior que 5%
    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="0.5"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Função para renderizar legenda customizada
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload.map((entry, index) => {
          // Buscar o item correspondente nos dados originais
          const dataItem = data.find(item => item.cor === entry.color) || data[index];
          return (
            <div key={index} className="flex items-center gap-1 text-xs">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-800 font-medium">
                {dataItem?.especialidade || `Item ${index + 1}`}: {(dataItem?.quantidade || 0).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {title}
          {isEstimated && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
              📊 ESTIMATIVA
            </span>
          )}
        </h3>
        {isEstimated && (
          <p className="text-sm text-orange-600 mt-1">
            * Dados simulados baseados em padrões regionais. Para dados reais, consulte a Secretaria Municipal de Saúde.
          </p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="quantidade"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.cor} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [
              value.toLocaleString(), 
              'Atendimentos'
            ]}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                return `${payload[0].payload.especialidade}`;
              }
              return label;
            }}
          />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;

