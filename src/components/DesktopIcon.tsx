
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
      onClick={onClick}
      className="flex flex-col items-center justify-center w-20 h-20 cursor-pointer group hover:bg-blue-200 hover:bg-opacity-50 rounded p-2 transition-colors"
    >
      <div>
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-8 h-8 object-contain"
        />
      </div>
      <span className="text-white text-xs text-center font-bold text-shadow-lg leading-tight">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
