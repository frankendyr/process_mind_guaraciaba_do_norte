import React, { useState } from 'react';

const MapComponent = ({ unidades, tipo = 'saude' }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Coordenadas base de Guaraciaba do Norte
  const centerLat = -4.167;
  const centerLng = -40.748;

  // Função para gerar coordenadas aproximadas baseadas no endereço
  const generateCoordinates = (endereco, index) => {
    const baseOffset = 0.01; // ~1km
    const randomOffset = () => (Math.random() - 0.5) * baseOffset * 2;
    
    // Coordenadas específicas conhecidas
    if (endereco.includes('Hospital') || endereco.includes('HOSPITAL')) {
      return { lat: -4.1675, lng: -40.7485 }; // Hospital São José
    }
    if (endereco.includes('Centro') || endereco.includes('CENTRO')) {
      return { lat: centerLat + randomOffset() * 0.3, lng: centerLng + randomOffset() * 0.3 };
    }
    if (endereco.includes('Santa Luzia') || endereco.includes('SANTA LUZIA')) {
      return { lat: -4.1680, lng: -40.7470 };
    }
    if (endereco.includes('Lagoinha') || endereco.includes('LAGOINHA')) {
      return { lat: -4.1650, lng: -40.7500 };
    }
    
    // Para unidades rurais, distribuir em um raio maior
    const angle = (index * 137.5) % 360; // Ângulo dourado para distribuição uniforme
    const distance = 0.02 + (Math.random() * 0.03); // 2-5km do centro
    const radians = (angle * Math.PI) / 180;
    
    return {
      lat: centerLat + Math.cos(radians) * distance,
      lng: centerLng + Math.sin(radians) * distance
    };
  };

  // Preparar dados das unidades com coordenadas
  const unidadesComCoordenadas = unidades.map((unidade, index) => ({
    ...unidade,
    coordinates: generateCoordinates(unidade.endereco || unidade.nome, index)
  }));

  // Calcular bounds do mapa
  const bounds = unidadesComCoordenadas.reduce(
    (acc, unidade) => ({
      minLat: Math.min(acc.minLat, unidade.coordinates.lat),
      maxLat: Math.max(acc.maxLat, unidade.coordinates.lat),
      minLng: Math.min(acc.minLng, unidade.coordinates.lng),
      maxLng: Math.max(acc.maxLng, unidade.coordinates.lng)
    }),
    { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity }
  );

  // Adicionar padding aos bounds
  const padding = 0.01;
  const mapBounds = {
    minLat: bounds.minLat - padding,
    maxLat: bounds.maxLat + padding,
    minLng: bounds.minLng - padding,
    maxLng: bounds.maxLng + padding
  };

  // Converter coordenadas para posição no SVG
  const coordToSvg = (lat, lng) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 800;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 600;
    return { x, y };
  };

  const getMarkerColor = (unidade) => {
    if (tipo === 'saude') {
      if (unidade.tipo === 'Hospital') return '#dc2626'; // Vermelho
      if (unidade.tipo === 'UBS') return '#2563eb'; // Azul
      if (unidade.tipo === 'CAPS') return '#7c3aed'; // Roxo
      if (unidade.tipo === 'CEO') return '#059669'; // Verde
      return '#f59e0b'; // Amarelo para outros
    } else {
      if (unidade.tipo === 'Ensino Fundamental') return '#2563eb';
      if (unidade.tipo === 'Educação Infantil') return '#dc2626';
      if (unidade.tipo === 'Educação de Jovens e Adultos') return '#059669';
      return '#f59e0b';
    }
  };

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative border">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="absolute inset-0"
      >
        {/* Fundo do mapa */}
        <rect width="800" height="600" fill="#e5f3ff" />
        
        {/* Grid de referência */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />
        
        {/* Área urbana (centro) */}
        <circle
          cx={coordToSvg(centerLat, centerLng).x}
          cy={coordToSvg(centerLat, centerLng).y}
          r="30"
          fill="#fef3c7"
          stroke="#f59e0b"
          strokeWidth="2"
          opacity="0.6"
        />
        <text
          x={coordToSvg(centerLat, centerLng).x}
          y={coordToSvg(centerLat, centerLng).y + 45}
          textAnchor="middle"
          className="text-xs font-semibold fill-amber-700"
        >
          Centro
        </text>
        
        {/* Marcadores das unidades */}
        {unidadesComCoordenadas.map((unidade, index) => {
          const pos = coordToSvg(unidade.coordinates.lat, unidade.coordinates.lng);
          const color = getMarkerColor(unidade);
          
          return (
            <g key={index}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-10 transition-all"
                onClick={() => setSelectedUnit(unidade)}
              />
              {selectedUnit === unidade && (
                <g>
                  <rect
                    x={pos.x - 80}
                    y={pos.y - 40}
                    width="160"
                    height="30"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                    rx="4"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 20}
                    textAnchor="middle"
                    className="text-xs font-semibold"
                    fill={color}
                  >
                    {unidade.nome.length > 20 ? unidade.nome.substring(0, 20) + '...' : unidade.nome}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legenda */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
        <h4 className="font-semibold text-sm mb-2">
          {tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'}
        </h4>
        <div className="space-y-1">
          {tipo === 'saude' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs">Hospital</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">UBS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-xs">CAPS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">CEO</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Outros</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">Ens. Fundamental</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs">Ed. Infantil</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">EJA</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Outros</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Informações da unidade selecionada */}
      {selectedUnit && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
          <button
            onClick={() => setSelectedUnit(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h4 className="font-semibold text-sm mb-2">{selectedUnit.nome}</h4>
          <p className="text-xs text-gray-600 mb-1">
            <strong>Tipo:</strong> {selectedUnit.tipo}
          </p>
          <p className="text-xs text-gray-600 mb-1">
            <strong>Endereço:</strong> {selectedUnit.endereco}
          </p>
          {selectedUnit.horario && (
            <p className="text-xs text-gray-600 mb-1">
              <strong>Horário:</strong> {selectedUnit.horario}
            </p>
          )}
          {selectedUnit.telefone && (
            <p className="text-xs text-gray-600">
              <strong>Telefone:</strong> {selectedUnit.telefone}
            </p>
          )}
        </div>
      )}
      
      {/* Instruções */}
      <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow border">
        <p className="text-xs text-gray-600">
          Clique nos marcadores para ver detalhes
        </p>
      </div>
    </div>
  );
};

export default MapComponent;

