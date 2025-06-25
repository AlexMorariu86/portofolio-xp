import { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const openWindow = (windowId: string) => {
    // Handle Internet Explorer specially - open GitHub directly
    if (windowId === 'internet') {
      window.open('https://github.com/AlexMorariu86', '_blank');
      return;
    }
    
    // For all other windows, open normally
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  const desktopIcons = [
    { id: 'recyclebin', imageSrc: 'public/images/icons/recycle-bin.png', label: 'Recycle Bin' },
    { id: 'mycomputer', imageSrc: 'public/images/icons/my-computer.png', label: 'My Computer' },
    { id: 'mydocuments', imageSrc: 'public/images/icons/my-documents.png', label: 'My Documents' },
    { id: 'notepad', imageSrc: 'public/images/icons/notepad.png', label: 'Notepad' },
    { id: 'internet', imageSrc: 'public/images/icons/internet-explorer.png', label: 'Internet Explorer' },
    { id: 'mail', imageSrc: 'public/images/icons/outlook-express.png', label: 'Outlook Express' },
  ];

  const renderWindow = (windowId: string) => {
    const windowConfig = {
      mycomputer: { title: 'My Computer', content: 'Local Disk (C:)\nCD Drive (D:)\nFloppy (A:)' },
      mydocuments: { title: 'My Documents', content: 'This folder contains your personal documents and files.' },
      notepad: { title: 'Notepad', content: 'Welcome to Windows XP Notepad!' },
      pictures: { title: 'My Pictures', content: 'Your picture collection will appear here.' },
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
        backgroundImage: `url('public/images/windows-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        {desktopIcons.map((iconData) => (
          <DesktopIcon
            key={iconData.id}
            imageSrc={iconData.imageSrc}
            label={iconData.label}
            onClick={() => openWindow(iconData.id)}
          />
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map(windowId => renderWindow(windowId))}

      {/* Taskbar */}
      <Taskbar />

    </div>
  );
};

export default Index;
