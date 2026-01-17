'use client'

import React, { useState, MouseEvent, TouchEvent, useRef, useEffect } from 'react';
import { X, Move, Type, Square, Container, Image as ImageIcon, Maximize2, Expand, Minimize2, Heading, Pilcrow, Tag, Minus, MousePointer2 } from 'lucide-react';
import { CanvasItem, ElementType, ViewMode } from './MainPart';

interface EditorCanvasProps {
  canvasItems: CanvasItem[];
  updateElement: (id: string, updates: Partial<CanvasItem>) => void;
  removeElement: (id: string) => void;
  handleElementClick: (element: CanvasItem) => void;

  selectedElement: CanvasItem | null;
  view: ViewMode;
  clearSelection: () => void;
  canvasBackground: string; // Add this prop
  canvasShadow: string; // Add this prop
  canvasImage: string;
}

interface DragState {
  id: string | null;
  type: 'move' | 'resize' | null;
  offset: { x: number; y: number };
  startDimensions?: { width: number; height: number };
  startPosition?: { x: number; y: number };
  resizeDirection?: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
}

interface ResizeHandleProps {
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  onMouseDown: (e: React.MouseEvent, direction: string) => void;
  onTouchStart: (e: React.TouchEvent, direction: string) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown, onTouchStart }) => {
  const getCursor = () => {
    switch (direction) {
      case 'n': case 's': return 'ns-resize';
      case 'e': case 'w': return 'ew-resize';
      case 'ne': case 'sw': return 'nesw-resize';
      case 'nw': case 'se': return 'nwse-resize';
      default: return 'pointer';
    }
  };

  const getPosition = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: '#3b82f6',
      border: '2px solid white',
      borderRadius: '2px',
      cursor: getCursor(),
      zIndex: 100
    };

    switch (direction) {
      case 'n': return { ...baseStyle, top: '-6px', left: '50%', transform: 'translateX(-50%)' };
      case 's': return { ...baseStyle, bottom: '-6px', left: '50%', transform: 'translateX(-50%)' };
      case 'e': return { ...baseStyle, right: '-6px', top: '50%', transform: 'translateY(-50%)' };
      case 'w': return { ...baseStyle, left: '-6px', top: '50%', transform: 'translateY(-50%)' };
      case 'ne': return { ...baseStyle, top: '-6px', right: '-6px' };
      case 'nw': return { ...baseStyle, top: '-6px', left: '-6px' };
      case 'se': return { ...baseStyle, bottom: '-6px', right: '-6px' };
      case 'sw': return { ...baseStyle, bottom: '-6px', left: '-6px' };
      default: return baseStyle;
    }
  };

  return (
    <div
      style={getPosition()}
      onMouseDown={(e) => {
        e.stopPropagation(); // Prevent event from bubbling to element
        onMouseDown(e, direction);
      }}
      onTouchStart={(e) => {
        e.stopPropagation(); // Prevent event from bubbling to element
        onTouchStart(e, direction);
      }}
      className="resize-handle hover:scale-125 transition-transform"
    />
  );
};

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  canvasItems,
  updateElement,
  removeElement,
  handleElementClick,
  selectedElement,
  view,
  clearSelection,
  canvasBackground,
  canvasImage,
  canvasShadow,
  
}) => {
  const [dragging, setDragging] = useState<DragState>({
    id: null,
    type: null,
    offset: { x: 0, y: 0 }
  });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [clearSelection]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (canvasRef.current && canvasRef.current.contains(target) && !target.closest('[data-canvas-item]')) {
        clearSelection();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => { document.removeEventListener('pointerdown', handlePointerDown); };
  }, [clearSelection]);

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type size={14} />;
      case 'button': return <Square size={14} />;
      case 'container': return <Container size={14} />;
      case 'icon': return <ImageIcon size={14} />;
      case 'title': return <Heading size={14} />;
      case 'input': return <MousePointer2 size={14} />;
      case 'title': return <Heading size={14} />;
      case 'paragraph': return <Pilcrow size={14} />;
      case 'label': return <Tag size={14} />;
      case 'divider': return <Minus size={14} />;
      default: return <Square size={14} />;
    }
  };

  const handleResizeStart = (e: MouseEvent | TouchEvent, item: CanvasItem, direction: string) => {
    e.stopPropagation();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const canvasRect = canvasRef.current?.getBoundingClientRect();

    if (!canvasRect) return;

    // Calculate offset relative to the element's position
    const offsetX = clientX - (canvasRect.left + item.position.x);
    const offsetY = clientY - (canvasRect.top + item.position.y);

    setDragging({
      id: item.id,
      type: 'resize',
      offset: { x: offsetX, y: offsetY },
      startDimensions: { ...item.dimensions },
      startPosition: { ...item.position },
      resizeDirection: direction as any
    });

    handleElementClick(item);
  };

  const handleMoveStart = (e: MouseEvent | TouchEvent, item: CanvasItem) => {
    e.stopPropagation();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const canvasRect = canvasRef.current?.getBoundingClientRect();

    if (!canvasRect) return;

    // Calculate offset relative to the element's position
    const offsetX = clientX - (canvasRect.left + item.position.x);
    const offsetY = clientY - (canvasRect.top + item.position.y);

    setDragging({
      id: item.id,
      type: 'move',
      offset: { x: offsetX, y: offsetY },
      startDimensions: { ...item.dimensions },
      startPosition: { ...item.position }
    });

    handleElementClick(item);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.id || !dragging.type || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const item = canvasItems.find(item => item.id === dragging.id);

    if (!item || !dragging.startPosition || !dragging.startDimensions) return;

    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    if (dragging.type === 'move') {
      const newX = mouseX - dragging.offset.x;
      const newY = mouseY - dragging.offset.y;

      // Boundary check
      const maxX = canvasRect.width - item.dimensions.width;
      const maxY = canvasRect.height - item.dimensions.height;
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      updateElement(item.id, {
        position: { x: boundedX, y: boundedY }
      });
    } else if (dragging.type === 'resize' && dragging.resizeDirection) {
      const direction = dragging.resizeDirection;
      let newWidth = dragging.startDimensions.width;
      let newHeight = dragging.startDimensions.height;
      let newX = dragging.startPosition.x;
      let newY = dragging.startPosition.y;

      // Calculate new dimensions based on resize direction
      if (direction.includes('e')) {
        newWidth = Math.max(50, mouseX - dragging.startPosition.x);
      }
      if (direction.includes('w')) {
        const deltaX = dragging.startPosition.x - mouseX;
        newWidth = Math.max(50, dragging.startDimensions.width + deltaX);
        newX = mouseX;
      }
      if (direction.includes('s')) {
        newHeight = Math.max(30, mouseY - dragging.startPosition.y);
      }
      if (direction.includes('n')) {
        const deltaY = dragging.startPosition.y - mouseY;
        newHeight = Math.max(30, dragging.startDimensions.height + deltaY);
        newY = mouseY;
      }

      // Boundary check
      const maxX = canvasRect.width - newWidth;
      const maxY = canvasRect.height - newHeight;
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      // Ensure minimum dimensions
      const finalWidth = Math.max(50, newWidth);
      const finalHeight = Math.max(30, newHeight);

      updateElement(item.id, {
        position: { x: boundedX, y: boundedY },
        dimensions: { width: finalWidth, height: finalHeight }
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging.id || !dragging.type || !canvasRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const item = canvasItems.find(item => item.id === dragging.id);

    if (!item || !dragging.startPosition || !dragging.startDimensions) return;

    const touchX = touch.clientX - canvasRect.left;
    const touchY = touch.clientY - canvasRect.top;

    if (dragging.type === 'move') {
      const newX = touchX - dragging.offset.x;
      const newY = touchY - dragging.offset.y;

      // Boundary check
      const maxX = canvasRect.width - item.dimensions.width;
      const maxY = canvasRect.height - item.dimensions.height;
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      updateElement(item.id, {
        position: { x: boundedX, y: boundedY }
      });
    } else if (dragging.type === 'resize' && dragging.resizeDirection) {
      const direction = dragging.resizeDirection;
      let newWidth = dragging.startDimensions.width;
      let newHeight = dragging.startDimensions.height;
      let newX = dragging.startPosition.x;
      let newY = dragging.startPosition.y;

      // Calculate new dimensions based on resize direction
      if (direction.includes('e')) {
        newWidth = Math.max(50, touchX - dragging.startPosition.x);
      }
      if (direction.includes('w')) {
        const deltaX = dragging.startPosition.x - touchX;
        newWidth = Math.max(50, dragging.startDimensions.width + deltaX);
        newX = touchX;
      }
      if (direction.includes('s')) {
        newHeight = Math.max(30, touchY - dragging.startPosition.y);
      }
      if (direction.includes('n')) {
        const deltaY = dragging.startPosition.y - touchY;
        newHeight = Math.max(30, dragging.startDimensions.height + deltaY);
        newY = touchY;
      }

      // Boundary check
      const maxX = canvasRect.width - newWidth;
      const maxY = canvasRect.height - newHeight;
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      // Ensure minimum dimensions
      const finalWidth = Math.max(50, newWidth);
      const finalHeight = Math.max(30, newHeight);

      updateElement(item.id, {
        position: { x: boundedX, y: boundedY },
        dimensions: { width: finalWidth, height: finalHeight }
      });
    }
  };

  const handleMouseUp = () => {
    setDragging({ id: null, type: null, offset: { x: 0, y: 0 } });
  };

  const containerClasses = view === 'mobile'
    ? 'w-[375px] h-[667px] border border-gray-300 rounded-3xl shadow-lg mx-auto my-8'
    : 'w-full h-full border border-gray-200 rounded-lg';

  const handleDoubleClick = (item: CanvasItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'text' || item.type === 'button') {
      const newContent = prompt('Enter new content:', item.content);
      if (newContent !== null) {
        updateElement(item.id, { content: newContent });
      }
    }
  };

  // Add event listeners for global mouse/touch events
  useEffect(() => {
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (dragging.id) {
        handleMouseMove(e as any);
      }
    };
    const handleGlobalTouchMove = (e: globalThis.TouchEvent) => {
      if (dragging.id) {
        handleTouchMove(e as any);
      }
    };
    const handleGlobalTouchEnd = () => handleMouseUp();

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [dragging]);

  

  return (
    <div className="p-4 bg-gray-50 h-full overflow-auto max-h-screen hide-scrollbar">
      <div
        ref={canvasRef}
        className={`relative ${containerClasses} transition-all duration-200 `}
        style={{
          background: canvasBackground, // Apply canvas background here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: canvasImage,
          boxShadow: canvasShadow, // Apply canvas shadow
        }}
      >
        {/* Canvas Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-t-lg">
          <div className="flex items-center gap-2">
            <Maximize2 size={16} className="text-gray-400" />
            <span className="text-sm font-medium">
              {view === 'mobile' ? 'Mobile View (375×667)' : 'Desktop View'}
            </span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-100 rounded">
              {canvasItems.length} element{canvasItems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative w-full h-[calc(100%-57px)]">
          {canvasItems.map((item) => {
            const isSelected = selectedElement?.id === item.id;
            const isHovered = hoveredElement === item.id;
            const isDragging = dragging.id === item.id;
            const canResize = item.type === 'container' || item.type === 'icon';

            // Calculate z-index based on element type and selection state
            let zIndex = isSelected ? 40 : 20;
            if (item.type === 'button' || item.type === 'text') {
              zIndex = isSelected ? 50 : 30;
            }

            return (
              <div
                key={item.id}
                data-canvas-item
                className={`absolute transition-all duration-150 ${isDragging ? 'opacity-90 cursor-grabbing' : 'cursor-move hover:shadow-lg'} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 z-20' : 'z-10'}`}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  width: `${item.dimensions.width}px`,
                  height: `${item.dimensions.height}px`,
                  color: item.style.color,
                  fontSize: item.style.fontSize,
                  fontWeight: item.style.fontWeight,
                  fontStyle: item.style.fontStyle,
                  textDecoration: item.style.textDecoration,
                  textAlign: item.style.textAlign,
                  border: item.style.border,
                  borderWidth: item.style.borderWidth,
                  borderColor: item.style.borderColor,
                  borderRadius: item.style.borderRadius,
                  userSelect: 'none',
                  zIndex: zIndex,
                  background: item.style.backgroundColor,

                }}
                onMouseEnter={() => setHoveredElement(item.id)}
                onMouseLeave={() => {
                  if (!isSelected) {
                    setHoveredElement(null);
                  }
                }}
                onMouseDown={(e) => handleMoveStart(e, item)}
                onTouchStart={(e) => handleMoveStart(e, item)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleElementClick(item);
                }}
                onDoubleClick={(e) => handleDoubleClick(item, e)}
              >
                {/* Element Content */}
                {item.type === 'text' && (
                  <div
                    className="w-full h-full outline-none cursor-text flex items-center p-2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(item.id, { content: e.currentTarget.textContent || '' })}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: item.style.fontSize,
                      color: item.style.color,
                      fontWeight: item.style.fontWeight
                    }}
                  >
                    {item.content}
                  </div>
                )}

                {item.type === 'button' && (
                  <button
                    className="w-full h-full flex items-center justify-center outline-none hover:opacity-90 transition-opacity p-2"
                    style={{
                      color: item.style.color,
                      fontSize: item.style.fontSize,
                      fontWeight: item.style.fontWeight,
                      borderRadius: item.style.borderRadius,
                      border: item.style.border
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      className="outline-none px-2 w-full text-center truncate"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(item.id, { content: e.currentTarget.textContent || '' })}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.content || 'Button'}
                    </span>
                  </button>
                )}

                {item.type === 'container' && (
                  <div
                    className="w-full h-full flex flex-col p-3"
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: item.style.border,
                      borderRadius: item.style.borderRadius,
                      backgroundImage: item.style.backgroundImage
                    }}
                  >
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">

                    </div>
                    {item.content && (
                      <div className="text-xs text-gray-400 mt-2 text-center">
                        {item.dimensions.width} × {item.dimensions.height}px
                      </div>
                    )}
                  </div>
                )}

                {item.type === 'icon' && (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: item.style.border,
                      borderRadius: item.style.borderRadius,
                      backgroundImage: item.style.backgroundImage
                    }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getElementIcon('icon')}
                    </div>
                  </div>
                )}
                {/* Input Element */}
                {item.type === 'input' && (
                  <div className="w-full h-full relative">
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateElement(item.id, { content: e.target.value })}
                      placeholder={'Enter text...'}
                      className="w-full h-full outline-none px-3 border-none focus:ring-0 bg-transparent"
                      style={{
                        color: item.style.color,
                        fontSize: item.style.fontSize,
                        backgroundColor: item.style.backgroundColor,
                        border: item.style.border,
                        borderRadius: item.style.borderRadius,
                        padding: item.style.padding
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {/* Email Input */}
                {item.type === 'email' && (
                  <div className="w-full h-full relative">
                    <input
                      type="email"
                      value={item.content}
                      onChange={(e) => updateElement(item.id, { content: e.target.value })}
                      placeholder={'you@example.com'}
                      className="w-full h-full outline-none px-3 border-none focus:ring-0 bg-transparent"
                      style={{
                        color: item.style.color,
                        fontSize: item.style.fontSize,
                        backgroundColor: item.style.backgroundColor,
                        border: item.style.border,
                        borderRadius: item.style.borderRadius,
                        padding: item.style.padding
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                  {/* Phone Input */}
      {item.type === 'phone' && (
        <div className="w-full h-full relative">
          <input
            type="tel"
            value={item.content}
            onChange={(e) => updateElement(item.id, { content: e.target.value })}
            placeholder={'(123) 456-7890'}
            className="w-full h-full outline-none px-3 border-none focus:ring-0 bg-transparent"
            style={{
              color: item.style.color,
              fontSize: item.style.fontSize,
              backgroundColor: item.style.backgroundColor,
              border: item.style.border,
              borderRadius: item.style.borderRadius,
              padding: item.style.padding
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

                {/* Title Element */}
                {item.type === 'title' && (
                  <div
                    className="w-full h-full outline-none cursor-text flex items-center p-2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(item.id, { content: e.currentTarget.textContent || '' })}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: item.style.fontSize,
                      color: item.style.color,
                      fontWeight: item.style.fontWeight,
                      textAlign: item.style.textAlign,
                      backgroundColor: item.style.backgroundColor
                    }}
                  >
                    {item.content}
                  </div>
                )}
                {/* Label Element */}
                {item.type === 'label' && (
                  <div
                    className="w-full h-full outline-none cursor-text flex items-center"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(item.id, { content: e.currentTarget.textContent || '' })}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: item.style.fontSize,
                      color: item.style.color,
                      fontWeight: item.style.fontWeight,
                      backgroundColor: item.style.backgroundColor
                    }}
                  >
                    {item.content}
                  </div>
                )}

                {/* Paragraph Element */}
                {item.type === 'paragraph' && (
                  <div
                    className="w-full h-full outline-none cursor-text p-2 overflow-auto"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(item.id, { content: e.currentTarget.textContent || '' })}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: item.style.fontSize,
                      color: item.style.color,
                      fontWeight: item.style.fontWeight,
                      textAlign: item.style.textAlign,
                      lineHeight: item.style.lineHeight,
                      backgroundColor: item.style.backgroundColor
                    }}
                  >
                    {item.content}
                  </div>
                )}

                {/* Divider Element */}
                {item.type === 'divider' && (
                  <div
                    className="w-full h-full"
                    
                  />
                )}

                {/* Delete Button (only shows on hover/select) */}
                {(isSelected || isHovered) && (
                  <button
                    className="absolute -top-6 -right-4 text-black rounded-full w-7 h-7 flex items-center justify-center text-xs transition-all duration-200 shadow-lg z-30 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(item.id);
                    }}
                    title="Delete element"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Resize Handles (only for containers/icons and only when selected) */}
                {canResize && isSelected && (
                  <>
                    {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map((direction) => (
                      <ResizeHandle
                        key={direction}
                        direction={direction as any}
                        onMouseDown={(e) => handleResizeStart(e, item, direction)}
                        onTouchStart={(e) => handleResizeStart(e, item, direction)}
                      />
                    ))}
                  </>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {canvasItems.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-6">
                <Type size={40} className="opacity-30" />
              </div>
              <p className="text-xl font-medium text-gray-600 mb-2">Your canvas is empty</p>
              <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
                Start building your design by adding elements from the left panel
              </p>
              <div className="grid grid-cols-2 gap-4">
                {(['button', 'text', 'container', 'icon'] as ElementType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const defaultElement: CanvasItem = {
                        id: `element-${Date.now()}`,
                        type,
                        content: type === 'button' ? 'Button' : type === 'text' ? 'Text' : '',
                        position: { x: 150, y: 150 },
                        dimensions: { width: 120, height: 40 },
                        style: {
                          backgroundColor: type === 'button' ? '#3b82f6' : type === 'container' ? '#f3f4f6' : 'transparent',
                          color: type === 'button' ? '#ffffff' : '#000000',
                          fontSize: '14px'
                        }
                      };
                      updateElement(defaultElement.id, defaultElement);
                    }}
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {getElementIcon(type)}
                    <span className="mt-2 text-sm font-medium capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Instructions */}
      <div className="mt-6 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Move size={12} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Hover + drag to move</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Expand size={12} className="text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Select containers to resize</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <X size={12} className="text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Hover + click X to delete</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Pro tip: Double-click text elements to edit content
        </p>
      </div>
    </div>
  );
};

export default EditorCanvas;