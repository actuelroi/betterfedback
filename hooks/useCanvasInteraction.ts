import { useCallback, useState } from 'react';
import { useCanvasStore } from '@/store/canvas-store';

export const useCanvasInteraction = () => {
  const { canvasItems, selectedElement, setSelectedElement, moveElement, resizeElement } = useCanvasStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

  const handleCanvasClick = useCallback((x: number, y: number) => {
    // Find clicked element (reverse for z-index order)
    const clickedElement = [...canvasItems].reverse().find(item => 
      x >= item.position.x && 
      x <= item.position.x + item.dimensions.width &&
      y >= item.position.y && 
      y <= item.position.y + item.dimensions.height
    );

    if (clickedElement) {
      setSelectedElement(clickedElement);
      return clickedElement;
    } else {
      setSelectedElement(null);
      return null;
    }
  }, [canvasItems, setSelectedElement]);

  const handleElementDrag = useCallback((elementId: string, deltaX: number, deltaY: number, canvasWidth: number, canvasHeight: number) => {
    const element = canvasItems.find(item => item.id === elementId);
    if (!element) return;

    const newX = element.position.x + deltaX;
    const newY = element.position.y + deltaY;

    // Boundary check
    const maxX = canvasWidth - element.dimensions.width;
    const maxY = canvasHeight - element.dimensions.height;
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));

    moveElement(elementId, { x: boundedX, y: boundedY });
  }, [canvasItems, moveElement]);

  const handleElementResize = useCallback((elementId: string, deltaWidth: number, deltaHeight: number, direction: string) => {
    const element = canvasItems.find(item => item.id === elementId);
    if (!element) return;

    let newWidth = element.dimensions.width;
    let newHeight = element.dimensions.height;
    let newX = element.position.x;
    let newY = element.position.y;

    if (direction.includes('e')) {
      newWidth = Math.max(50, element.dimensions.width + deltaWidth);
    }
    if (direction.includes('w')) {
      newWidth = Math.max(50, element.dimensions.width - deltaWidth);
      newX = element.position.x + deltaWidth;
    }
    if (direction.includes('s')) {
      newHeight = Math.max(30, element.dimensions.height + deltaHeight);
    }
    if (direction.includes('n')) {
      newHeight = Math.max(30, element.dimensions.height - deltaHeight);
      newY = element.position.y + deltaHeight;
    }

    resizeElement(elementId, { width: newWidth, height: newHeight });
    if (direction.includes('w') || direction.includes('n')) {
      moveElement(elementId, { x: newX, y: newY });
    }
  }, [canvasItems, resizeElement, moveElement]);

  const startDrawing = useCallback((x: number, y: number) => {
    setIsDrawing(true);
    setStartPoint({ x, y });
  }, []);

  const endDrawing = useCallback(() => {
    setIsDrawing(false);
    setStartPoint(null);
  }, []);

  const drawSelectionBox = useCallback((currentX: number, currentY: number, ctx: CanvasRenderingContext2D) => {
    if (!startPoint) return;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      startPoint.x,
      startPoint.y,
      currentX - startPoint.x,
      currentY - startPoint.y
    );
    ctx.setLineDash([]);
  }, [startPoint]);

  return {
    isDrawing,
    startPoint,
    handleCanvasClick,
    handleElementDrag,
    handleElementResize,
    startDrawing,
    endDrawing,
    drawSelectionBox,
    selectedElement,
    canvasItems
  };
};