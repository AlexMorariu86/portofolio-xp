
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  iconColor?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  iconColor = "text-blue-600"
}) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-20 h-20 cursor-pointer group hover:bg-blue-200 hover:bg-opacity-50 rounded p-2 transition-colors"
    >
      <div className="bg-white rounded shadow-lg p-2 mb-1">
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <span className="text-white text-xs text-center font-bold text-shadow-lg leading-tight">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
