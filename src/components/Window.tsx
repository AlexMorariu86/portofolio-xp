
import React, { useState } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  children, 
  onClose, 
  width = "w-96", 
  height = "h-64" 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`absolute top-20 left-20 ${isMaximized ? 'w-full h-full top-0 left-0' : `${width} ${height}`} bg-white border-2 border-gray-400 shadow-xl z-30`}>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 flex items-center justify-between border-b border-gray-400">
        <span className="font-bold text-sm">{title}</span>
        <div className="flex space-x-1">
          <button className="w-5 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 rounded-sm flex items-center justify-center">
            <Minus className="w-3 h-3 text-black" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-5 h-5 bg-gray-300 hover:bg-gray-400 border border-gray-500 rounded-sm flex items-center justify-center"
          >
            <Square className="w-2 h-2 text-black" />
          </button>
          <button 
            onClick={onClose}
            className="w-5 h-5 bg-red-500 hover:bg-red-600 border border-gray-500 rounded-sm flex items-center justify-center"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 h-full overflow-auto bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default Window;
