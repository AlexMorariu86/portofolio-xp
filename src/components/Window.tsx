
import React, { useState, useRef } from 'react';
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
  const [position, setPosition] = useState({ x: 80, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={windowRef}
      className={`absolute ${isMaximized ? 'w-full h-full top-0 left-0' : `${width} ${height}`} bg-white border-2 border-gray-400 shadow-xl z-30 ${isDragging ? 'cursor-move' : ''}`}
      style={!isMaximized ? { left: `${position.x}px`, top: `${position.y}px` } : {}}
    >
      {/* Title Bar */}
      <div 
        className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 flex items-center justify-between border-b border-gray-400 ${!isMaximized ? 'cursor-move' : ''}`}
        onMouseDown={handleMouseDown}
      >
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
