import React from 'react';

interface SelectionRectangleProps {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isVisible: boolean;
}

const SelectionRectangle: React.FC<SelectionRectangleProps> = ({
  startX,
  startY,
  currentX,
  currentY,
  isVisible
}) => {
  if (!isVisible) return null;

  // Calculate rectangle dimensions
  const left = Math.min(startX, currentX);
  const top = Math.min(startY, currentY);
  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: '1px dotted #000',
        backgroundColor: 'rgba(173, 216, 230, 0.3)', // Light blue with transparency
        boxSizing: 'border-box'
      }}
    />
  );
};

export default SelectionRectangle;