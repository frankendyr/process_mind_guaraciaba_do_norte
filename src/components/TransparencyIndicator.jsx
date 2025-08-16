import React from 'react';

const TransparencyIndicator = ({ type, source, description }) => {
  const getIndicatorStyle = (type) => {
    switch (type) {
      case 'real':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          icon: '✓',
          label: 'REAL'
        };
      case 'ibge':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-300',
          icon: '📊',
          label: 'IBGE'
        };
      case 'estimativa':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-300',
          icon: '📊',
          label: 'ESTIMATIVA'
        };
      case 'simulado':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
          icon: '🔄',
          label: 'SIMULADO'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-300',
          icon: '?',
          label: 'DESCONHECIDO'
        };
    }
  };

  const style = getIndicatorStyle(type);

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
      <span className="text-xs">{style.icon}</span>
      <span>{style.label}</span>
      {source && (
        <span className="text-xs opacity-75">({source})</span>
      )}
    </div>
  );
};

export default TransparencyIndicator;

