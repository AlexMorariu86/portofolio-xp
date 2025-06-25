interface DesktopIconProps {
  imageSrc: string;
  label: string;
  onClick?: () => void;
  imageAlt?: string;
  isSelected?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  imageSrc, 
  label, 
  onClick,
  imageAlt = label,
  isSelected = false
}) => {
  return (
    <div 
      onDoubleClick={onClick}
      className={`flex flex-col items-center justify-center w-20 h-20 cursor-pointer group rounded p-2 transition-colors ${
        isSelected 
          ? 'bg-blue-500 bg-opacity-50' 
          : 'hover:bg-blue-200 hover:bg-opacity-50'
      }`}
    >
      <div>
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-8 h-8 object-contain"
        />
      </div>
      <span className={`text-xs text-center font-bold leading-tight ${
        isSelected ? 'text-white' : 'text-white text-shadow-lg'
      }`}>
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
