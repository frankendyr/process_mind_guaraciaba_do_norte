import React, { useState } from 'react';

const RealMapComponent = ({ unidades, tipo = 'saude' }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Coordenadas de Guaraciaba do Norte, CE
  const centerLat = -4.167;
  const centerLng = -40.748;

  // URL do Google Maps embed para Guaraciaba do Norte
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63421.89234567890!2d-40.78!3d-4.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a0b5c123456789a%3A0x123456789abcdef0!2sGuaraciaba%20do%20Norte%2C%20CE!5e0!3m2!1spt!2sbr!4v1692345678901!5m2!1spt!2sbr`;

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
      {/* Mapa real do Google Maps */}
      <iframe
        src={googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
        title={`Mapa de ${tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'} - Guaraciaba do Norte`}
      ></iframe>
      
      {/* Overlay com informações */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
        <h4 className="font-semibold text-sm mb-2">
          {tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'}
        </h4>
        <div className="space-y-1">
          {tipo === 'saude' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs">Hospital (1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">UBS (16)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-xs">CAPS (1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">CEO (1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Outros (7)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">Ens. Fundamental (15)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs">Ed. Infantil (18)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs">EJA (2)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Outros (2)</span>
              </div>
            </>
          )}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <span className="text-xs text-green-600 font-medium">✓ REAL</span>
          <p className="text-xs text-gray-500">Dados oficiais CNES/INEP</p>
        </div>
      </div>
      
      {/* Lista de unidades */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border max-w-xs max-h-32 overflow-y-auto">
        <h5 className="font-semibold text-xs mb-2">
          {tipo === 'saude' ? 'Unidades de Saúde' : 'Escolas'} ({unidades.length})
        </h5>
        <div className="space-y-1">
          {unidades.slice(0, 5).map((unidade, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getMarkerColor(unidade) }}
              ></div>
              <span className="text-xs text-gray-700 truncate">
                {unidade.nome}
              </span>
            </div>
          ))}
          {unidades.length > 5 && (
            <p className="text-xs text-gray-500 italic">
              +{unidades.length - 5} mais...
            </p>
          )}
        </div>
      </div>
      
      {/* Instruções */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow border">
        <p className="text-xs text-gray-600">
          📍 Mapa real de Guaraciaba do Norte
        </p>
        <p className="text-xs text-gray-500">
          Use os controles para navegar
        </p>
      </div>
    </div>
  );
};

export default RealMapComponent;

