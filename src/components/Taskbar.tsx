
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Settings, 
  User, 
  FileText, 
  Music, 
  Image,
  Volume2,
  Wifi,
  Battery
} from 'lucide-react';

const Taskbar = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const startMenuItems = [
    { icon: User, label: 'My Documents', color: 'text-blue-600' },
    { icon: Image, label: 'My Pictures', color: 'text-green-600' },
    { icon: Music, label: 'My Music', color: 'text-purple-600' },
    { icon: FileText, label: 'My Computer', color: 'text-gray-600' },
    { icon: Settings, label: 'Control Panel', color: 'text-orange-600' },
    { icon: Search, label: 'Search', color: 'text-blue-500' },
  ];

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div className="absolute bottom-10 left-0 w-80 bg-gradient-to-b from-blue-500 to-blue-700 rounded-tr-lg shadow-2xl border-2 border-blue-800 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-tr-lg">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8" />
              <span className="font-bold">User</span>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="p-2">
            {startMenuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 px-3 py-2 hover:bg-blue-600 rounded cursor-pointer text-white"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
            
            <div className="border-t border-blue-400 my-2"></div>
            
            <div className="flex items-center space-x-3 px-3 py-2 hover:bg-blue-600 rounded cursor-pointer text-white">
              <Settings className="w-5 h-5 text-red-500" />
              <span>Turn Off Computer</span>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-400 to-blue-600 border-t-2 border-blue-300 flex items-center justify-between px-2 z-40">
        {/* Start Button */}
        <Button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="h-8 px-3 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-2 border-green-300 rounded text-white font-bold shadow-md"
        >
          start
        </Button>

        {/* Quick Launch */}
        <div className="flex items-center space-x-1 ml-2">
          <div className="w-6 h-6 bg-blue-800 rounded border border-blue-900 flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div className="w-6 h-6 bg-blue-800 rounded border border-blue-900 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-white" />
          <Wifi className="w-4 h-4 text-white" />
          <Battery className="w-4 h-4 text-white" />
          <div className="bg-blue-800 px-2 py-1 rounded text-white text-xs font-mono">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
