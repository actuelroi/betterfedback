import { CanvasItem, ElementType } from '@/types/canvas';
import { defaultConfig } from '@/utils/default';
import { create } from 'zustand';


interface CanvasStore {
  // Canvas state
  canvasItems: CanvasItem[];
  selectedElement: CanvasItem | null;
  canvasBackground: string;
  canvasShadow: string;
  canvasImage: string;
  
  // Actions for canvas
  setCanvasItems: (items: CanvasItem[]) => void;
  addElement: (elementType: ElementType) => void;
  updateElement: (id: string, updates: Partial<CanvasItem>) => void;
  removeElement: (id: string) => void;
  clearSelection: () => void;
  setSelectedElement: (element: CanvasItem | null) => void;
  setCanvasBackground: (background: string) => void;
  setCanvasShadow: (shadow: string) => void;
  setCanvasImage: (image: string) => void;
  
  // Canvas-specific actions
  moveElement: (id: string, position: { x: number; y: number }) => void;
  resizeElement: (id: string, dimensions: { width: number; height: number }) => void;
  duplicateElement: (id: string) => void;
}





export const useCanvasStore = create<CanvasStore>((set) => ({
  // Initial state
  canvasItems: [
    {
      id: 'demo-text',
      type: 'text',
      content: 'Welcome to the Editor',
      position: { x: 100, y: 100 },
      dimensions: { width: 300, height: 60 },
      style: {
        color: '#000000',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    },
    {
      id: 'demo-button',
      type: 'button',
      content: 'Click Me',
      position: { x: 150, y: 200 },
      dimensions: { width: 200, height: 50 },
      style: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        border: 'none'
      }
    },
    {
      id: 'demo-container',
      type: 'container',
      content: '',
      position: { x: 50, y: 300 },
      dimensions: { width: 400, height: 200 },
      style: {
        backgroundColor: '#f3f4f6',
        border: '2px dashed #d1d5db',
        borderRadius: '12px',
        opacity: '1'
      }
    }
  ],
  selectedElement: null,
  canvasBackground: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  canvasShadow: '0 1px 3px rgba(0,0,0,0.1)',
  canvasImage: '',
  // Actions
  setCanvasItems: (items) => set({ canvasItems: items }),
  
  addElement: (elementType) => {
    const config = defaultConfig[elementType];
    const newElement: CanvasItem = {
      id: `element-${Date.now()}`,
      type: elementType,
      content: config.content,
      position: { x: 100, y: 100 },
      dimensions: config.dimensions,
      style: config.style
    };
    
    set((state) => ({
      canvasItems: [...state.canvasItems, newElement],
      selectedElement: newElement
    }));
  },
  
  updateElement: (id, updates) => {
    set((state) => ({
      canvasItems: state.canvasItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ),
      selectedElement: state.selectedElement?.id === id 
        ? { ...state.selectedElement, ...updates }
        : state.selectedElement
    }));
  },
  
  removeElement: (id) => {
    set((state) => ({
      canvasItems: state.canvasItems.filter(item => item.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
    }));
  },
  
  clearSelection: () => set({ selectedElement: null }),
  
  setSelectedElement: (element) => set({ selectedElement: element }),
  setCanvasBackground: (background) => set({ canvasBackground: background }),
  
  setCanvasShadow: (shadow) => set({ canvasShadow: shadow }),
  
  setCanvasImage: (image) => set({ canvasImage: image }),
  
  moveElement: (id, position) => {
    set((state) => ({
      canvasItems: state.canvasItems.map(item => 
        item.id === id ? { ...item, position } : item
      )
    }));
  },
  
  resizeElement: (id, dimensions) => {
    set((state) => ({
      canvasItems: state.canvasItems.map(item => 
        item.id === id ? { ...item, dimensions } : item
      )
    }));
  },
  
  duplicateElement: (id) => {
    set((state) => {
      const elementToDuplicate = state.canvasItems.find(item => item.id === id);
      if (!elementToDuplicate) return state;
      
      const duplicatedElement: CanvasItem = {
        ...elementToDuplicate,
        id: `element-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        }
      };
      
      return {
        canvasItems: [...state.canvasItems, duplicatedElement],
        selectedElement: duplicatedElement
      };
    });
  }
}));




// Selector hooks for better performance
export const useCanvasItems = () => useCanvasStore((state) => state.canvasItems);
export const useSelectedElement = () => useCanvasStore((state) => state.selectedElement);
export const useCanvasActions = () => useCanvasStore((state) => ({
  addElement: state.addElement,
  updateElement: state.updateElement,
  removeElement: state.removeElement,
  setSelectedElement: state.setSelectedElement,
  clearSelection: state.clearSelection,
  moveElement: state.moveElement,
  resizeElement: state.resizeElement,
  duplicateElement: state.duplicateElement
}));


