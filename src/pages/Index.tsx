
import React, { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import { 
  Monitor, 
  FolderOpen, 
  FileText, 
  Music, 
  Image, 
  Settings, 
  Globe,
  Calculator,
  Mail,
  Trash2
} from 'lucide-react';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  const desktopIcons = [
    { id: 'mycomputer', icon: Monitor, label: 'My Computer', color: 'text-gray-600' },
    { id: 'mydocuments', icon: FolderOpen, label: 'My Documents', color: 'text-blue-600' },
    { id: 'notepad', icon: FileText, label: 'Notepad', color: 'text-gray-700' },
    { id: 'media', icon: Music, label: 'Windows Media Player', color: 'text-orange-600' },
    { id: 'pictures', icon: Image, label: 'My Pictures', color: 'text-green-600' },
    { id: 'internet', icon: Globe, label: 'Internet Explorer', color: 'text-blue-500' },
    { id: 'calculator', icon: Calculator, label: 'Calculator', color: 'text-purple-600' },
    { id: 'mail', icon: Mail, label: 'Outlook Express', color: 'text-blue-700' },
    { id: 'recyclebin', icon: Trash2, label: 'Recycle Bin', color: 'text-gray-500' },
  ];

  const renderWindow = (windowId: string) => {
    const windowConfig = {
      mycomputer: { title: 'My Computer', content: 'Local Disk (C:)\nCD Drive (D:)\nFloppy (A:)' },
      mydocuments: { title: 'My Documents', content: 'This folder contains your personal documents and files.' },
      notepad: { title: 'Untitled - Notepad', content: 'Welcome to Windows XP Notepad!' },
      media: { title: 'Windows Media Player', content: 'Ready to play media files...' },
      pictures: { title: 'My Pictures', content: 'Your picture collection will appear here.' },
      internet: { title: 'Internet Explorer', content: 'Welcome to Internet Explorer for Windows XP!' },
      calculator: { title: 'Calculator', content: 'Standard Calculator\n\n[7] [8] [9] [/]\n[4] [5] [6] [*]\n[1] [2] [3] [-]\n[0] [.] [=] [+]' },
      mail: { title: 'Outlook Express', content: 'No new messages in your inbox.' },
      recyclebin: { title: 'Recycle Bin', content: 'The Recycle Bin is empty.' },
    };

    const config = windowConfig[windowId as keyof typeof windowConfig];
    if (!config) return null;

    return (
      <Window
        key={windowId}
        title={config.title}
        onClose={() => closeWindow(windowId)}
        width="w-96"
        height="h-80"
      >
        <div className="font-mono text-sm whitespace-pre-line">
          {config.content}
        </div>
      </Window>
    );
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #1e5f99 100%)`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-30 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        {desktopIcons.map((iconData) => (
          <DesktopIcon
            key={iconData.id}
            icon={iconData.icon}
            label={iconData.label}
            iconColor={iconData.color}
            onClick={() => openWindow(iconData.id)}
          />
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map(windowId => renderWindow(windowId))}

      {/* Taskbar */}
      <Taskbar />

      {/* XP Logo watermark */}
      <div className="absolute bottom-20 right-8 opacity-20">
        <div className="text-white text-6xl font-bold transform rotate-12">
          XP
        </div>
      </div>
    </div>
  );
};

export default Index;
