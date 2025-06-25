import { useState, useRef } from 'react';
import Taskbar from '@/components/Taskbar';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import SelectionRectangle from '@/components/SelectionRectangle';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  
  // Marquee selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionCurrent, setSelectionCurrent] = useState({ x: 0, y: 0 });
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  
  const desktopRef = useRef<HTMLDivElement>(null);

  const openWindow = (windowId: string) => {
    // Handle Internet Explorer specially - open GitHub directly
    if (windowId === 'internet') {
      window.open('https://github.com/AlexMorariu86', '_blank');
      return;
    }
    
    // For all other windows, open normally
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
      setActiveWindow(windowId);
    } else {
      // If window is already open, just focus it
      setActiveWindow(windowId);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(openWindows.length > 1 ? openWindows[0] : null);
    }
  };

  const focusWindow = (windowId: string) => {
    setActiveWindow(windowId);
  };

  // Marquee selection handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start selection if clicking on the desktop (not on icons or windows)
    if (e.target === desktopRef.current) {
      const rect = desktopRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setIsSelecting(true);
      setSelectionStart({ x, y });
      setSelectionCurrent({ x, y });
      setSelectedIcons([]); // Clear previous selection
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && desktopRef.current) {
      const rect = desktopRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setSelectionCurrent({ x, y });
      
      // Check which icons are within the selection rectangle
      updateSelectedIcons(selectionStart.x, selectionStart.y, x, y);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const updateSelectedIcons = (startX: number, startY: number, currentX: number, currentY: number) => {
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const right = Math.max(startX, currentX);
    const bottom = Math.max(startY, currentY);
    
    const selected: string[] = [];
    
    // Check each icon's position (you'll need to adjust these coordinates based on your icon layout)
    desktopIcons.forEach((icon, index) => {
      const iconLeft = 16; // Left margin
      const iconTop = 16 + (index * 96); // Top margin + (index * icon height with gap)
      const iconRight = iconLeft + 80; // Icon width
      const iconBottom = iconTop + 80; // Icon height
      
      // Check if icon intersects with selection rectangle
      if (iconLeft < right && iconRight > left && iconTop < bottom && iconBottom > top) {
        selected.push(icon.id);
      }
    });
    
    setSelectedIcons(selected);
  };

  const desktopIcons = [
    { id: 'recyclebin', imageSrc: '/images/icons/recycle-bin.png', label: 'Recycle Bin' },
    { id: 'mycomputer', imageSrc: '/images/icons/my-computer.png', label: 'My Computer' },
    { id: 'mydocuments', imageSrc: '/images/icons/my-documents.png', label: 'My Documents' },
    { id: 'notepad', imageSrc: '/images/icons/notepad.png', label: 'Notepad' },
    { id: 'internet', imageSrc: '/images/icons/internet-explorer.png', label: 'Internet Explorer' },
    { id: 'mail', imageSrc: '/images/icons/outlook-express.png', label: 'Outlook Express' },
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

    const isActive = activeWindow === windowId;

    return (
      <Window
        key={windowId}
        title={config.title}
        onClose={() => closeWindow(windowId)}
        onFocus={() => focusWindow(windowId)}
        isActive={isActive}
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
      ref={desktopRef}
      className="min-h-screen relative overflow-hidden select-none"
      style={{
        backgroundImage: `url('/images/windows-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        {desktopIcons.map((iconData) => (
          <DesktopIcon
            key={iconData.id}
            imageSrc={iconData.imageSrc}
            label={iconData.label}
            onClick={() => openWindow(iconData.id)}
            isSelected={selectedIcons.includes(iconData.id)}
          />
        ))}
      </div>

      {/* Selection Rectangle */}
      <SelectionRectangle
        startX={selectionStart.x}
        startY={selectionStart.y}
        currentX={selectionCurrent.x}
        currentY={selectionCurrent.y}
        isVisible={isSelecting}
      />

      {/* Open Windows */}
      {openWindows.map(windowId => renderWindow(windowId))}

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
        onWindowClose={closeWindow}
      />
    </div>
  );
};

export default Index;
